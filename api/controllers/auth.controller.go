package controllers

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"go.mongodb.org/mongo-driver/bson"
	
	"gopkg.in/gomail.v2"

	"api/config"
	
)

// User represents a simple user model.
type User struct {
	ID           interface{} `bson:"_id,omitempty" json:"id,omitempty"`
	Username     string      `bson:"username" json:"username"`
	Email        string      `bson:"email" json:"email"`
	Password     string      `bson:"password" json:"password"`
	Avatar       string      `bson:"avatar,omitempty" json:"avatar,omitempty"`
	ResetToken   string      `bson:"reset_token,omitempty" json:"-"`
	ResetExpires int64       `bson:"reset_expires,omitempty" json:"-"`
	CreatedAt    time.Time   `bson:"createdAt" json:"createdAt"`
}

// LoginInput represents the expected login payload.
type LoginInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// JWTClaims defines the structure for JWT claims.
type JWTClaims struct {
	ID string `json:"id"`
	jwt.StandardClaims
}

// generateToken creates a JWT token for the given userID.
func generateToken(userID string) (string, error) {
	claims := JWTClaims{
		ID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

// hashPassword hashes the provided password.
func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	return string(bytes), err
}

// verifyPassword compares a hashed password with its plaintext equivalent.
func verifyPassword(hashed, plain string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(plain))
	return err == nil
}

// Signup registers a new user.
func Signup(c *gin.Context) {
	var user User

	// Bind incoming JSON to the user struct.
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Hash the password.
	hashedPassword, err := hashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	user.Password = hashedPassword
	user.CreatedAt = time.Now()

	collection := config.DB.Collection("users")
	_, err = collection.InsertOne(context.TODO(), user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User creation failed"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"success": true, "message": "User registered successfully"})
}

// Signin logs in a user.
func Signin(c *gin.Context) {
	var input LoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Get the users collection from the MongoDB database.
	collection := config.DB.Collection("users")

	var user User
	// Look up the user by email.
	err := collection.FindOne(context.TODO(), bson.M{"email": input.Email}).Decode(&user)
	if err != nil || !verifyPassword(user.Password, input.Password) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Convert user.ID to a string for token generation.
	// Depending on your implementation, user.ID may be of type primitive.ObjectID.
	userIDStr := fmt.Sprintf("%v", user.ID)
	token, err := generateToken(userIDStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Optionally, you might want to omit the password from the returned user object.
	user.Password = ""

	c.JSON(http.StatusOK, gin.H{"token": token, "user": user})
}
// ForgotPassword sends a password reset link.
func ForgotPassword(c *gin.Context) {
	var input struct{ Email string }
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid email"})
		return
	}

	var user User
	collection := config.DB.Collection("users")
	err := collection.FindOne(context.TODO(), bson.M{"email": input.Email}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	tokenBytes := make([]byte, 32)
	_, err = rand.Read(tokenBytes)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}
	resetToken := hex.EncodeToString(tokenBytes)

	update := bson.M{"$set": bson.M{
		"reset_token":   resetToken,
		"reset_expires": time.Now().Add(time.Hour).Unix(),
	}}
	_, err = collection.UpdateOne(context.TODO(), bson.M{"email": input.Email}, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update reset token"})
		return
	}

	resetLink := os.Getenv("FRONTEND_URL") + "/reset-password/" + resetToken
	sendResetEmail(user.Email, resetLink)

	c.JSON(http.StatusOK, gin.H{"message": "Password reset link sent!"})
}

// ResetPassword resets the user's password.
func ResetPassword(c *gin.Context) {
	var input struct {
		Token    string `json:"token"`
		Password string `json:"password"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var user User
	collection := config.DB.Collection("users")
	err := collection.FindOne(context.TODO(), bson.M{
		"reset_token":   input.Token,
		"reset_expires": bson.M{"$gt": time.Now().Unix()},
	}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
		return
	}

	hashedPassword, err := hashPassword(input.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}
	update := bson.M{"$set": bson.M{"password": hashedPassword, "reset_token": nil, "reset_expires": nil}}
	_, err = collection.UpdateOne(context.TODO(), bson.M{"email": user.Email}, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to reset password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password has been reset"})
}

// sendResetEmail sends a password reset email.
func sendResetEmail(email, link string) {
	m := gomail.NewMessage()
	m.SetHeader("From", os.Getenv("EMAIL_USER"))
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Password Reset Request")
	m.SetBody("text/html", "Click <a href='"+link+"'>here</a> to reset your password.")

	d := gomail.NewDialer("smtp.gmail.com", 587, os.Getenv("EMAIL_USER"), os.Getenv("EMAIL_PASS"))
	d.DialAndSend(m)
}
