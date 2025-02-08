package controllers

import (
	"api/config"
	"api/models"
	"context"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Create Listing
func CreateListing(c *gin.Context) {
	var listing models.Listing
	if err := c.ShouldBindJSON(&listing); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	collection := config.DB.Collection("listings")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	listing.ID = primitive.NewObjectID()
	listing.CreatedAt = time.Now()
	listing.UpdatedAt = time.Now()

	_, err := collection.InsertOne(ctx, listing)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error creating listing"})
		return
	}

	c.JSON(http.StatusCreated, listing)
}

// Delete Listing
func DeleteListing(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid listing ID"})
		return
	}

	collection := config.DB.Collection("listings")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	result, err := collection.DeleteOne(ctx, bson.M{"_id": objID})
	if err != nil || result.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Listing not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Listing has been deleted"})
}

// Update Listing
func UpdateListing(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid listing ID"})
		return
	}

	var updateData models.Listing
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	updateData.UpdatedAt = time.Now()

	collection := config.DB.Collection("listings")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	update := bson.M{"$set": updateData}
	result, err := collection.UpdateOne(ctx, bson.M{"_id": objID}, update)
	if err != nil || result.ModifiedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Listing not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Listing updated successfully"})
}

// Get Single Listing
func GetListing(c *gin.Context) {
	id := c.Param("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid listing ID"})
		return
	}

	var listing models.Listing
	collection := config.DB.Collection("listings")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&listing)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Listing not found"})
		return
	}

	c.JSON(http.StatusOK, listing)
}

// Get Listings with Filters
func GetListings(c *gin.Context) {
	// Get optional query parameter "status"
	status := c.Query("status")
	collection := config.DB.Collection("listings")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{}
	if status != "" {
		filter["status"] = status
	}

	// Optional: support pagination via query params "limit" and "skip"
	limitStr := c.Query("limit")
	skipStr := c.Query("skip")
	var limit int64 = 0
	var skip int64 = 0
	if limitStr != "" {
		if l, err := strconv.ParseInt(limitStr, 10, 64); err == nil {
			limit = l
		}
	}
	if skipStr != "" {
		if s, err := strconv.ParseInt(skipStr, 10, 64); err == nil {
			skip = s
		}
	}
	findOptions := options.Find()
	if limit > 0 {
		findOptions.SetLimit(limit)
	}
	if skip > 0 {
		findOptions.SetSkip(skip)
	}

	cursor, err := collection.Find(ctx, filter, findOptions)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching listings"})
		return
	}
	defer cursor.Close(ctx)

	var listings []models.Listing
	for cursor.Next(ctx) {
		var listing models.Listing
		if err := cursor.Decode(&listing); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error decoding listing"})
			return
		}
		listings = append(listings, listing)
	}

	c.JSON(http.StatusOK, listings)
}


func AdminUpdateListing(c *gin.Context) {
	// Get listing id from query parameter.
	id := c.Query("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing id query parameter"})
		return
	}
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid listing id"})
		return
	}

	var updateData models.Listing
	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Set updated timestamp.
	updateData.UpdatedAt = time.Now()

	collection := config.DB.Collection("listings")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Build update using the $set operator.
	update := bson.M{"$set": bson.M{
		"status":         updateData.Status,
		"name":           updateData.Name,
		"description":    updateData.Description,
		"regular_price":  updateData.RegularPrice,
		"discount_price": updateData.DiscountPrice,
		"type":           updateData.Type,
		"address":        updateData.Address,
		"city":           updateData.City,
		"state":          updateData.State,
		"bedrooms":       updateData.Bedrooms,
		"bathrooms":      updateData.Bathrooms,
		"furnished":      updateData.Furnished,
		"parking":        updateData.Parking,
		"updatedAt":      updateData.UpdatedAt,
	}}

	result, err := collection.UpdateOne(ctx, bson.M{"_id": objID}, update)
	if err != nil || result.MatchedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Listing not found or update failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": true, "message": "Listing updated successfully"})
}