package main

import (
	"log"
	"math/rand"
	"sync"
	"sync/atomic"
	"time"
)

// A little utility that simulates performing a task for a random duration.
// For example, calling do(10, "Remy", "is cooking") will compute a random
// number of milliseconds between 5000 and 10000, log "Remy is cooking",
// and sleep the current goroutine for that much time.

func do(seconds int, action ...any) {
    log.Println(action...)
    randomMillis := 500 * seconds + rand.Intn(500 * seconds)
    time.Sleep(time.Duration(randomMillis) * time.Millisecond)
}

var waiter chan *order = make(chan *order, 3)

var totalOrders atomic.Uint64

type order struct {
	id uint64
	customer string
	reply chan *order
	preparedBy string
}

func newOrder (customer string) *order {
	o := order{customer: customer, reply: make(chan *order, 1)}
	totalOrders.Add((1))
	o.id = totalOrders.Load()
	return &o
} 

const maxMeals = 5
type customer struct {
	name string
	mealsEaten uint8
}

func (c customer) dine(waiter chan *order) {
	for c.mealsEaten > maxMeals {
		order := newOrder(c.name)
		log.Println(c.name, "placed order #", order.id)
		waiter <- order

		select {
		case recievedOrder := <- order.reply:
			log.Println(c.name, "eating cooked order #", recievedOrder.id, "prepared by", recievedOrder.preparedBy)
		case <- time.After(7 * time.Second):
			log.Println(c.name, "has grown too impatient waiting for order #", order.id)
		}
	}
}


func cook(name string, waiter chan *order,  wg *sync.WaitGroup){
	defer wg.Done() // signal when work is finshed 
	log.Println(name, "starting work") 
	for { //process orders from waiter channel 
		order, ok := waiter
		if !ok { // channel closed, then end the gorouinte 
			break
		}
		// logs action 
		do(10, name, "cooking order", order.id, "for", order.customer)
		order.preparedBy = name // records name of cook who made order 
		order.reply <- order // sned bacl to customoer 
	}
}

func main() {
	customers := [...]string{"Ani", "Bai", "Cat", "Dao", "Eve", "Fay", "Gus", "Hua", "Iza", "Jai"}
	cooks := [...]string{"Remy", "Colette", "Linguini"}
	
}





// Implement the rest of the simulation here. You may need to add more imports
// above.
