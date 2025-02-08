package models

import "github.com/dgrijalva/jwt-go"

// JWTClaims defines the structure for JWT claims.
type JWTClaims struct {
    ID string `json:"id"`
    jwt.StandardClaims
}
