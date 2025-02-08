package routes

import (
	"github.com/gin-gonic/gin"
	"api/controllers"
)

func AuthRoutes(router *gin.Engine) {
	auth := router.Group("/api/auth")
	{
		auth.POST("/signup", controllers.Signup)
		// You can add other auth routes here:
		 auth.POST("/signin", controllers.Signin)
		 auth.POST("/forgot-password", controllers.ForgotPassword)
		 auth.POST("/reset-password", controllers.ResetPassword)

		 auth.POST("/adminRegister", controllers.AdminRegister)
		auth.POST("/adminLogin", controllers.AdminLogin)
	}
}
