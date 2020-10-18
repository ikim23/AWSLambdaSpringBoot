(ns scramblies.views
  (:require [scramblies.events :as evt]
            [scramblies.subs :as sub]
            [scramblies.utils :as u]))

(defn container [children]
  [:div.container
   [:div.notification children]])

(defn subtitle [text]
  [:h2.subtitle text])

(defn success-message []
  [:div.notification.is-success {:style {:margin-top "1em"}} "Yep, this text is scrambled!"])

(defn failure-message []
  [:div.notification.is-danger {:style {:margin-top "1em"}} "Nope, this text is not scrambled. Try again."])

(defn text-field [{:keys [label placeholder error value on-change]}]
  [:div.field
   [:label.label label]
   [:div.control
    [:input {:class ["input" (when error "is-danger")]
             :type "text"
             :placeholder placeholder
             :value value
             :on-change (fn [evt] (on-change (-> evt .-target .-value)))}]]
   (when error [:p.help.is-danger error])])

(defn button [{:keys [disabled text on-submit]}]
  [:input.button.is-primary {:type "submit"
                             :disabled disabled
                             :value text
                             :on-click (fn [evt]
                                         (.preventDefault evt)
                                         (on-submit))}])

(defn scramble-form []
  (let [scrambled (u/<sub ::sub/scrambled)
        scrambled-error (u/<sub ::sub/scrambled-error)
        text (u/<sub ::sub/text)
        text-error (u/<sub ::sub/text-error)
        disabled (u/<sub ::sub/submit-disabled?)
        result (u/<sub ::sub/result)]
    [:form
     [subtitle "Check if the text is present in scrambled sequence"]
     [text-field {:label "Scrambled text:"
                  :placeholder "E.g. cedewaraaossoqqyt"
                  :error scrambled-error
                  :value scrambled
                  :on-change #(u/>evt ::evt/set-scrambled %)}]
     [text-field {:label "Text:"
                  :placeholder "E.g. codewars"
                  :error text-error
                  :value text
                  :on-change #(u/>evt ::evt/set-text %)}]
     [button {:disabled disabled
              :text "Is scrambled?"
              :on-submit #(u/>evt ::evt/check-scrambled)}]
     (cond
       (true? result) [success-message]
       (false? result) [failure-message])]))

(defn main-panel []
  [container [scramble-form]])
