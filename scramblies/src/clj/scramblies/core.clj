(ns scramblies.core
  (:require [clojure.set :as s]
            [scramblies.validators :as v]))

(defn scramble?
  "Returns true if a portion of str1 characters can be rearranged to match str2, otherwise returns false"
  [str1 str2]
  (if (and (v/valid-scramble-text? str1) (v/valid-scramble-text? str2))
    (s/subset? (set str2) (set str1))
    false))