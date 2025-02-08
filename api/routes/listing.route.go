package routes

import (
	"github.com/gin-gonic/gin"
	"api/controllers"
	"api/middleware"
)

// ListingRoutes sets up routes for listings
func ListingRoutes(router *gin.Engine) {
	listing := router.Group("/api/listing")
	{
		// Create a new listing (protected route)
		listing.POST("/create", controllers.CreateListing)

		// Delete a listing (protected route)
		listing.DELETE("/delete/:id", middleware.AuthMiddleware(), controllers.DeleteListing)

		// Update a listing (protected route)
		listing.PUT("/update/:id", middleware.AuthMiddleware(), controllers.UpdateListing)

		// Get a single listing by ID
		listing.GET("/get/:id", controllers.GetListing)

		// Get all listings with filters
		listing.GET("/get", controllers.GetListings)
		listing.PUT("/adminUpdateListing", controllers.AdminUpdateListing)

		// Uncomment if these features are implemented in the controller
		// listing.GET("/getAllListingCount", controllers.GetListingCount)
		// listing.PUT("/adminUpdateListing", middleware.AuthMiddleware(), controllers.AdminUpdateListing)
	}
}
