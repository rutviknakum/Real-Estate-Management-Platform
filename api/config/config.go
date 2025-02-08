package config

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// DB is a global variable holding our MongoDB database instance.
var DB *mongo.Database

// InitDB connects to MongoDB and initializes the DB variable.
func InitDB() {
	// Hardcoded MongoDB connection URI (update with your credentials if needed)
	uri := "mongodb+srv://202312017:R49OJ8R9ouE6YQEw@cluster0.wyik0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	
	// Create a context with timeout for the connection
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Create a new MongoDB client and connect
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}

	// Select your database (replace "your_database_name" with the actual name)
	DB = client.Database("your_database_name")

	fmt.Println("Connected to MongoDB successfully")
}
