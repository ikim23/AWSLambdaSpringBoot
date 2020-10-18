(ns scramblies.handler
  (:require [compojure.core :refer [defroutes]]
            [ring.middleware.reload :refer [wrap-reload]]
            [scramblies.routes.home :refer [home-routes]]
            [scramblies.routes.services :refer [service-routes]]))

(defroutes routes
  home-routes
  service-routes)

(def dev-handler (-> #'routes wrap-reload))

(def handler routes)
