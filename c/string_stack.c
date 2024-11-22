#include "string_stack.h"
#include "stdlib.h"
#include "string.h"

#define MIN_CAPACITY 16

struct _Stack {
    size_t capacity;
    size_t size;
    char** elements;
};

stack_response create() {
    char** initial_elements = calloc(MIN_CAPACITY, sizeof(char*));
    if (initial_elements != NULL) {
        stack stack_alloc = calloc(1, sizeof(struct _Stack));
        if (stack_alloc != NULL) {
            *stack_alloc = (struct _Stack){MIN_CAPACITY, 0, initial_elements};
            return (stack_response){success, stack_alloc};
        }
        else{
            free(initial_elements);
        }
    }
    return (stack_response){out_of_memory, NULL};
}

bool is_empty(const stack s) {
    return s->size == 0;
}

bool is_full(const stack s) {
    return s->size >= MAX_CAPACITY;
}

int size(const stack s) {
    return s->size;
}

response_code push(stack s, char* item) {
    if (s->size >= MAX_CAPACITY) {
        return stack_full;
    }
    size_t item_length = strlen(item) + 1;
    if (item_length > MAX_ELEMENT_BYTE_SIZE) {
        return stack_element_too_large;
    }

    char* item_copy = calloc(item_length, sizeof(char));
    if (item_copy == NULL) {
        return out_of_memory;
    }
    memcpy(item_copy, item, item_length);
    if (s->size + 1 > s->capacity) {
        s->capacity *= 2;
        char** expanded_elements = realloc(s->elements, s->capacity * sizeof(char*));
        if (expanded_elements != NULL) {
            s->elements = expanded_elements;
        }
        else {
            free(item_copy);
            s->capacity /= 2;
            return out_of_memory;
        }
    }
    s->elements[s->size] = item_copy;
    s->size++;
    return success;
}

string_response pop(stack s) {
    if (is_empty(s)) {
        return (string_response){stack_empty, NULL};
    }
    char* popped_item = s->elements[s->size - 1];
    size_t item_length = strlen(popped_item) + 1;
    char* item_copy = calloc(item_length, sizeof(char));
    if (item_copy == NULL) {
        return (string_response){out_of_memory, NULL};
    }
    memcpy(item_copy, popped_item, item_length);
    free(popped_item);
    s->size--;

    const size_t capacity_threshold = s->capacity / 4;
    if (s->size < capacity_threshold) {
        char** shrunk_elements = realloc(s->elements, capacity_threshold * sizeof(char*));
        // A failed reallocation isn't necessarily an error state,
        // since the stack can continue to function as normal with its previous capacity
        if (shrunk_elements != NULL) {
            s->elements = shrunk_elements;
            s->capacity = capacity_threshold;
        }
    }
    return (string_response){success, item_copy};
}

void destroy(stack* s) {
    int i;
    for (i = 0; i < (*s)->size; i++) {
        free((*s)->elements[i]);
        (*s)->elements[i] = NULL;
    }
    free((*s)->elements);
    (*s)->elements = NULL;
    free(*s);
    *s = NULL;
}
