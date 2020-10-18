(ns scramblies.validators)

(defn valid-scramble-text? [str]
  (and (string? str) (re-matches #"[a-z]+" str)))