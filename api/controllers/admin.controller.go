package controllers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"go.mongodb.org/mongo-driver/bson"
"api/models"
	"api/config"
)

// Admin represents an admin user.
type Admin struct {
	ID        interface{} `bson:"_id,omitempty" json:"id,omitempty"`
	Username  string      `bson:"username" json:"username"`
	Email     string      `bson:"email" json:"email"`
	Password  string      `bson:"password" json:"password"`
	CreatedAt time.Time   `bson:"createdAt" json:"createdAt"`
}

// AdminRegisterInput represents the expected input for admin registration.
type AdminRegisterInput struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// AdminLoginInput represents the expected input for admin login.
type AdminLoginInput struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// JWTClaims defines the structure for JWT claims.

	func generateAdminToken(userID string) (string, error) {
		claims := models.JWTClaims{
			ID: userID,
			StandardClaims: jwt.StandardClaims{
				ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
			},
		}
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
		return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	}

// AdminRegister registers a new admin.
func AdminRegister(c *gin.Context) {
	var input AdminRegisterInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// Hash the password.
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	admin := Admin{
		Username:  input.Username,
		Email:     input.Email,
		Password:  string(hashedPassword),
		CreatedAt: time.Now(),
	}

	collection := config.DB.Collection("admins")
	_, err = collection.InsertOne(context.TODO(), admin)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Admin registration failed"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"success": true, "message": "Admin registered successfully"})
}

// AdminLogin logs in an admin user.
func AdminLogin(c *gin.Context) {
	var input AdminLoginInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var admin Admin
	collection := config.DB.Collection("admins")
	err := collection.FindOne(context.TODO(), bson.M{"email": input.Email}).Decode(&admin)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Verify password.
	if err := bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(input.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Convert admin.ID to string for token generation.
	adminIDStr := fmt.Sprintf("%v", admin.ID)
	token, err := generateAdminToken(adminIDStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Clear password before returning.
	admin.Password = ""
	c.JSON(http.StatusOK, gin.H{"token": token, "admin": admin})
}
