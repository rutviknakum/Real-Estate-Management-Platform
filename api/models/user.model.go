package models

import (
	
	"time"
)

type User struct {
	ID                  uint   `gorm:"primaryKey"`
	Username            string `gorm:"not null"`
	Email               string `gorm:"not null;unique"`
	Password            string `gorm:"not null"`
	Avatar              string `gorm:"default:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'"`
	ResetPasswordToken  *string
	ResetPasswordExpires *time.Time
	CreatedAt           time.Time
	UpdatedAt           time.Time
}

func (u *User) TableName() string {
	return "users"
}
