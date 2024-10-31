exception Negative_Amount

let change amount =
  if amount < 0 then
    raise Negative_Amount
  else
    let denominations = [25; 10; 5; 1] in
    let rec aux remaining denominations =
      match denominations with
      | [] -> []
      | d :: ds -> (remaining / d) :: aux (remaining mod d) ds
    in
    aux amount denominations

let rec first_then_apply (lst : 'a list) (pred : 'a -> bool) (f : 'a -> 'b option) : 'b option =
  match lst with
  | [] -> None
  | x :: xs -> 
      if pred x then f x
      else first_then_apply xs pred f

(* Modified lower function that returns a string option *)
let lower s = Some (String.lowercase_ascii s)

(* Write your powers generator here *)

let powers_generator base =
  let rec aux n () = 
    Seq.Cons (n, aux (n * base))
  in
  aux 1
  

(* Write your line count function here *)

(* Write your shape type and associated functions here *)

(* Write your binary search tree implementation here *)
