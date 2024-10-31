module Exercises
    ( change,
      firstThenApply,
      powers,
      meaningfulLineCount,
      BST (Empty), size, insert, contains, inorder,
      Form (..), surfaceArea, volume
    ) where

import qualified Data.Map as Map
import Data.Text (pack, unpack, replace)
import Data.List(isPrefixOf, find)
import Data.Char(isSpace)

change :: Integer -> Either String (Map.Map Integer Integer)
change amount
    | amount < 0 = Left "amount cannot be negative"
    | otherwise = Right $ changeHelper [25, 10, 5, 1] amount Map.empty
        where
          changeHelper [] remaining counts = counts
          changeHelper (d:ds) remaining counts =
            changeHelper ds newRemaining newCounts
              where
                (count, newRemaining) = remaining `divMod` d
                newCounts = Map.insert d count counts

firstThenApply ::  [a] -> (a -> Bool) -> (a -> b) -> Maybe b
firstThenApply x p f = f <$> find p x

powers :: Integral b => b -> [b]
powers base = (base^) <$> [0..]

meaningfulLineCount :: FilePath -> IO Int
meaningfulLineCount filename = fmap (length . filterMeaningless . lines) (readFile filename)
  where
    filterMeaningless = filterComments . trimAndRemoveWhitespace
      where
        filterComments = filter (\l -> head l /= '#')
        trimAndRemoveWhitespace = filter (not . null) . fmap (filter (not . isSpace))

-- This is the proper name for a 3-dimensional shape :))))
data Form
  = Box Double Double Double
  | Sphere Double
  deriving (Eq, Show)

-- Shamelessly lifted from the non-evil people at Google
surfaceArea :: Form -> Double
surfaceArea (Box l w h) = 2 * (w * l + h * l + h * w)
surfaceArea (Sphere r) = 4 * pi * (r ^ 2)

volume :: Form -> Double
volume (Box l w h) = l * w * h
volume (Sphere r) = 4 / 3 * pi * (r ^ 3)

data BST a = Empty | Node (BST a) a (BST a)

size :: BST a -> Integer
size Empty = 0
size (Node l c r) = size l + 1 + size r

insert :: Ord a => a -> BST a -> BST a
insert a Empty = Node Empty a Empty
insert a (Node l c r) 
  | a == c = Node l c r
  | a < c = Node (insert a l) c r 
  | otherwise = Node l c (insert a r)

contains :: Ord a => a -> BST a -> Bool
contains _ Empty = False
contains a (Node l c r)
  | a == c = True
  | a < c = contains a l
  | otherwise = contains a r

inorder :: Ord a => BST a -> [a]
inorder Empty = []
inorder (Node l c r) = inorder l ++ [c] ++ inorder r

instance(Show a) => Show (BST a) where
  show :: Show a => BST a -> String
  show Empty = "()"
  show (Node l c r) = "(" ++ strChild l ++ show c ++ strChild r ++ ")"
    where
      strChild b
        | show b == "()" = "" -- Filtering out empty case
        | otherwise = show b
