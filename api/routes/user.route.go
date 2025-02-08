package routes

import (
	"github.com/gin-gonic/gin"
	"api/controllers"
	"api/middleware"
)

func UserRoutes(router *gin.Engine) {
	user := router.Group("/api/user")
	{
		user.GET("/:id", middleware.AuthMiddleware(), controllers.GetUserByID)
		user.PUT("/:id", middleware.AuthMiddleware(), controllers.UpdateUser)
		user.DELETE("/:id", middleware.AuthMiddleware(), controllers.DeleteUser)
	}
}
