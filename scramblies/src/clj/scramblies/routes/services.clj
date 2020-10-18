(ns scramblies.routes.services
  (:require [compojure.api.sweet :refer :all]
            [ring.util.http-response :refer :all]
            [schema.core :as s]
            [scramblies.core :refer [scramble?]]))

(defapi service-routes
  {:swagger {:ui   "/swagger-ui"
             :spec "/swagger.json"
             :data {:info {:version "1.0.0"
                           :title   "Scramblies"}}}}
  (context "/api" []
    (POST "/scramble" []
      :summary "Return true if findText could be reproduced from scrambledText"
      :body    [{:keys [scrambledText findText]} {:scrambledText s/Str :findText s/Str}]
      :return  {:result s/Bool}
      (ok {:result (scramble? scrambledText findText)}))))