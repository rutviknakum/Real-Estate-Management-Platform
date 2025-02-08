package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Listing model for MongoDB
type Listing struct {
	ID            primitive.ObjectID `bson:"_id,omitempty"`
	Name          string             `bson:"name"`
	Description   string             `bson:"description"`
	Address       string             `bson:"address"`
	State         string             `bson:"state"`
	City          string             `bson:"city"`
	RegularPrice  float64            `bson:"regular_price"`
	DiscountPrice float64            `bson:"discount_price"`
	Bathrooms     int                `bson:"bathrooms"`
	Bedrooms      int                `bson:"bedrooms"`
	Furnished     bool               `bson:"furnished"`
	Parking       bool               `bson:"parking"`
	Type          string             `bson:"type"`
	Offer         bool               `bson:"offer"`
	ImageUrls     []string           `bson:"image_urls"`
	UserRef       primitive.ObjectID `bson:"user_ref"`
	Status        string             `bson:"status"`

	CreatedAt time.Time `bson:"created_at"`
	UpdatedAt time.Time `bson:"updated_at"`
}
