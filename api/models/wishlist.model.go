package models

import (
	"time"

)

type Wishlist struct {
	ID        uint `gorm:"primaryKey"`
	UserID    uint `gorm:"not null"`
	ListingID uint `gorm:"not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

func (w *Wishlist) TableName() string {
	return "wishlists"
}
