(ns scramblies.events
  (:require [re-frame.core :as rf]
            [ajax.core :as ajax]
            [scramblies.db :as db]))

(rf/reg-event-db
 ::initialize-db
 (fn [_ _]
   db/default-db))

(rf/reg-event-db
 ::set-scrambled
 (fn [db [_ text]]
   (assoc db :scrambled-text text :result nil)))

(rf/reg-event-db
 ::set-text
 (fn [db [_ text]]
   (assoc db :find-text text :result nil)))

(rf/reg-event-db
 ::set-result
 (fn [db [_ {result :result}]]
   (assoc db :result result :submitting false)))

(rf/reg-event-db
 ::check-fail
 (fn [db _]
   (assoc db :result false :submitting false)))

(rf/reg-event-fx
 ::check-scrambled
 (fn [{db :db} _]
   (let [body {"scrambledText" (:scrambled-text db)
               "findText" (:find-text db)}]
     {:db (assoc db :submitting true)
      :http-xhrio {:method          :post
                   :uri             "/api/scramble"
                   :params          body
                   :format          (ajax/json-request-format)
                   :response-format (ajax/json-response-format {:keywords? true})
                   :on-success      [::set-result]
                   :on-failure      [::check-fail]}})))