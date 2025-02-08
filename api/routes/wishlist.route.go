package routes

import (
	"github.com/gin-gonic/gin"
	"api/controllers"
)

func WishlistRoutes(router *gin.Engine) {
	wishlist := router.Group("/api/wishlist")
	{
		wishlist.POST("/addWishlist", controllers.AddWishlist)
		wishlist.GET("/displayWishlist", controllers.DisplayWishlist)
		wishlist.DELETE("/removeWishlist", controllers.RemoveWishlist)
	}
}
