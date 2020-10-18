(ns scramblies.core-test
  (:require [clojure.test :refer :all]
            [scramblies.core :refer :all]))

(deftest scramble-test
  (testing "Returns true if a portion of str1 characters can be rearranged to match str2, otherwise returns false"
    (is (= (scramble? nil nil) false) "params cannot be nil")
    (is (= (scramble? "" "") false) "params cannot be empty strings")
    (is (= (scramble? "Hello" "Hello") false) "params cannot contain uppercase characters")
    (is (= (scramble? "h3llo" "h3llo") false) "params cannot contain non-alpha characters")
    (is (= (scramble? "rekqodlw" "world") true))
    (is (= (scramble? "cedewaraaossoqqyt" "codewars") true))
    (is (= (scramble? "katas" "steak") false))))

