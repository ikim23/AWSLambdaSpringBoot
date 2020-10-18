(ns scramblies.utils
  (:require [re-frame.core :as rf]))

(defn <sub [query-id & args]
  (->> args (cons query-id) (vec) (rf/subscribe) (deref)))

(defn >evt [event-id & args]
  (->> args (cons event-id) (vec) (rf/dispatch)))
