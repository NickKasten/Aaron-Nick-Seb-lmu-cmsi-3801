exception Negative_Amount
open Fun;;

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

let powers_generator base =
  let rec aux n () = 
    Seq.Cons (n, aux (n * base))
  in
  aux 1
  
(*
let meaningful_line_count filename =
  val count_line 
  (* Based on code found in https://ocaml.org/docs/file-manipulation *)
  (* And also https://ocaml.org/docs/error-handling *)
  # let ic = open_in filename in
    let finally () = close_in ic in
    let work () = head_channel ic in
    Fun.protect ~finally work;;
*)
(* Write your shape type and associated functions here *)

type form =
  | Sphere of float
  | Box of float * float * float

let volume f =
  match f with
  | Sphere r -> Float.pi *. (r ** 3.) *. 4. /. 3.
  | Box (l, w, h) -> l *. w *. h

let surface_area f =
  match f with
  | Sphere r -> 4. *. Float.pi *. (r ** 2.)
  | Box (l, w, h) -> 2. *. (w *. l +. h *. l +. h *. w)
  
(* Write your binary search tree implementation here *)
type 'a bst =
  | Empty
  | Node of 'a bst * 'a * bst

(* BAD *)
let insert v t =
  match t with
  | Empty -> Node Empty v Empty
  | Node (l, c, r) -> 
    if c == v then Node l c r
    else if c < v then Node (insert )
