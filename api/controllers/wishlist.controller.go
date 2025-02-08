package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Wishlist struct {
	ID        uint   `gorm:"primaryKey"`
	UserID    string `json:"userId" binding:"required"`
	ListingID string `json:"listingId" binding:"required"`
}

type Listing struct {
	ID   uint   `gorm:"primaryKey"`
	Name string `json:"name"`
	// Add other fields as per your schema
}

// AddWishlist adds a listing to the user's wishlist
func AddWishlist(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var wishlist Wishlist

	if err := c.ShouldBindJSON(&wishlist); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": 401, "message": "Not all fields added"})
		return
	}

	if err := db.Create(&wishlist).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": 500, "message": "Failed to add to wishlist"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"status":  201,
		"message": "This property has been added to your wishlist!",
		"wishlist": wishlist,
	})
}

// DisplayWishlist retrieves a user's wishlist listings
func DisplayWishlist(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	userID := c.Query("userId")

	var wishlist []Wishlist
	if err := db.Where("user_id = ?", userID).Find(&wishlist).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": 500, "message": "Failed to retrieve wishlist"})
		return
	}

	var listingIDs []string
	for _, item := range wishlist {
		listingIDs = append(listingIDs, item.ListingID)
	}

	var listings []Listing
	if err := db.Where("id IN ?", listingIDs).Find(&listings).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": 500, "message": "Failed to retrieve listings"})
		return
	}

	c.JSON(http.StatusOK, listings)
}

// RemoveWishlist removes a listing from the user's wishlist
func RemoveWishlist(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var request struct {
		UserID    string `json:"userId" binding:"required"`
		ListingID string `json:"listingId" binding:"required"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": 401, "message": "Not all fields provided"})
		return
	}

	var wishlist Wishlist
	if err := db.Where("user_id = ? AND listing_id = ?", request.UserID, request.ListingID).Delete(&wishlist).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": 500, "message": "Failed to remove from wishlist"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status":  201,
		"message": "This property has been removed from your wishlist!",
	})
}
