package main

import (
	"log"
	"net/http"
	"path/filepath"

	"api/config"
	"api/routes"
	"api/middleware"

	"github.com/gin-gonic/gin"
	
)

// errorHandler sends a JSON response with an error message.
func errorHandler(c *gin.Context, statusCode int, message string) {
	c.JSON(statusCode, gin.H{
		"success":    false,
		"statusCode": statusCode,
		"message":    message,
	})
}

func main() {
	// Initialize MongoDB connection.
	config.InitDB()

	// Create a new Gin router.
	router := gin.Default()

	// Use Recovery and Logger middleware.
	router.Use(gin.Recovery(), gin.Logger())

	// Add CORS middleware.
	router.Use(middleware.CORSMiddleware())

	routes.UserRoutes(router)
	// Register the listing routes.
	routes.ListingRoutes(router)
	// Register the wishlist routes.
	routes.WishlistRoutes(router)


	// Sample route to verify server is running.
	router.GET("/api/test", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Test route working!"})
	})

	// Serve static files from "./client/dist" (if applicable).
	clientPath, err := filepath.Abs("./client/dist")
	if err != nil {
		log.Fatal("Failed to determine client path:", err)
	}
	router.Static("/static", clientPath)
	router.NoRoute(func(c *gin.Context) {
		c.File(filepath.Join(clientPath, "index.html"))
	})

	// Start the server on port 8080.
	port := "8080"
	log.Printf("Server started on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
