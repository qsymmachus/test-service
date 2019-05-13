package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"time"
)

// Basic config values.
const port = ":8080"

// Some helpful messages our server will send back to clients.
var messages = [7]string{
	"A complex system that works is invariably found to have evolved from a simple system that worked.",
	"Testing shows the presence, not the absence of bugs.",
	"The competent programmer is fully aware of the strictly limited size of his own skull.",
	"Simplicity is a great virtue but it requires hard work to achieve it.",
	"Programs must be written for people to read, and only incidentally for machines to execute.",
	"Language is an instrument of human reason, and not merely a medium for the expression of thought.",
	"Comprehensiveness is the enemy of comprehensibility.",
}

// The structure of our response body.
type Response struct {
	Message   string `json:"message"`
	Timestamp int64  `json:"timestamp"`
}

func randMessage() string {
	rand.Seed(time.Now().Unix())
	return messages[rand.Intn(len(messages))]
}

// Handler function for our server. Generates a Response, JSON encodes it, and writes it to the response body.
func handler(w http.ResponseWriter, r *http.Request) {
	response := Response{randMessage(), time.Now().Unix()}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)
	json.NewEncoder(w).Encode(response)
}

// Spin it up!
func main() {
	fmt.Printf("Server running on port %s...\n", port)
	http.HandleFunc("/", handler)
	http.ListenAndServe(port, nil)
}
