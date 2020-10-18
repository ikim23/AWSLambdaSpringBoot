(ns scramblies.routes.home
  (:require [compojure.core :refer [defroutes GET]]
            [compojure.route :refer [resources]]
            [ring.util.response :refer [resource-response]]))

(defroutes home-routes
  (GET "/" [] (resource-response "index.html" {:root "public"}))
  (resources "/"))
