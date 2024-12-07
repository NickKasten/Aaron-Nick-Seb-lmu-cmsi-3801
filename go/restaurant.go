package main

import (
	"log"
	"math/rand"
	"sync"
	"sync/atomic"
	"time"
)

func do(seconds int, action ...any) {
    log.Println(action...)
    randomMillis := 500 * seconds + rand.Intn(500 * seconds)
    time.Sleep(time.Duration(randomMillis) * time.Millisecond)
}

var totalOrders atomic.Uint64

type order struct {
	id uint64
	customer string
	reply chan *order
	preparedBy string
}

func newOrder (customer string) *order {
	o := order{customer: customer, reply: make(chan *order, 2)}
	totalOrders.Add((1))
	o.id = totalOrders.Load()
	return &o
} 

const maxMeals = 5

const maxWaitTime = 7
const eatTime = 2
const leaveTime = 5
func dine(name string, waiter chan *order,  wg *sync.WaitGroup) {
	defer wg.Done()
	log.Println(name, "entered the restaurant.")
	mealsEaten := 0
	for mealsEaten < maxMeals {
		order := newOrder(name)
		log.Println(name, "placed order #", order.id)
		select {
		case waiter <- order:
			recievedOrder := <- order.reply
			do(eatTime, name, "is eating cooked order #", recievedOrder.id, "prepared by", recievedOrder.preparedBy)
			mealsEaten++
		case <- time.After(maxWaitTime * time.Second):
			do(leaveTime, name, "stormed out of the restaurant, abandoning order #", order.id)
		}
	}
	log.Println(name, "was satiated and left the restaurant")
}

const cookTime = 10
func cook(name string, waiter chan *order){
	log.Println(name, "is ready to cook") 
	for {
		order := <- waiter
		do(cookTime, name, "began cooking order #", order.id, "for", order.customer)
		order.preparedBy = name
		order.reply <- order
	}
}

func main() {
	var wg sync.WaitGroup
	var waiter chan *order = make(chan *order, 3)
	customers := [...]string{"Ani", "Bai", "Cat", "Dao", "Eve", "Fay", "Gus", "Hua", "Iza", "Jai"}
	chefs := [...]string{"Remy", "Colette", "Linguini"}

	for _, chef := range chefs {
		go cook(chef, waiter)
	}
	for _, customer := range customers {
		wg.Add(1)
		go dine(customer, waiter, &wg)
	}
	
	wg.Wait()
	log.Println("The restaurant is now closed.")
}