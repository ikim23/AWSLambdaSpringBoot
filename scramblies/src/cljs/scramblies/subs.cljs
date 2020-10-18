(ns scramblies.subs
  (:require [re-frame.core :as rf]
            [scramblies.validators :as v]))

(rf/reg-sub
 ::scrambled
 (fn [db]
   (:scrambled-text db)))

(rf/reg-sub
 ::text
 (fn [db]
   (:find-text db)))

(rf/reg-sub
 ::submitting
 (fn [db]
   (:submitting db)))

(rf/reg-sub
 ::result
 (fn [db]
   (:result db)))

(defn error-message [text]
  (cond
    (empty? text) "Value cannot be empty"
    (not (v/valid-scramble-text? text)) "Value can contain only alpha characters"))

(rf/reg-sub
 ::scrambled-error
 (fn [_ _]
   (rf/subscribe [::scrambled]))
 (fn [scrambled _]
   (error-message scrambled)))

(rf/reg-sub
 ::text-error
 (fn [_ _]
   (rf/subscribe [::text]))
 (fn [text _]
   (error-message text)))

(rf/reg-sub
 ::submit-disabled?
 (fn [_ _]
   [(rf/subscribe [::scrambled-error])
    (rf/subscribe [::text-error])
    (rf/subscribe [::submitting])])
 (fn [[s-error t-error submitting] _]
   (or s-error t-error submitting)))