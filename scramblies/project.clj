(defproject scramblies "0.1.0-SNAPSHOT"
  :dependencies [[org.clojure/clojure "1.10.0"]
                 [org.clojure/clojurescript "1.10.520"]
                 [reagent "0.8.1"]
                 [re-frame "0.10.6"]
                 [day8.re-frame/http-fx "0.1.6"]
                 [cljs-ajax "0.8.0"]
                 [compojure "1.5.0"]
                 [yogthos/config "0.8"]
                 [ring "1.4.0"]
                 [metosin/compojure-api "1.1.12"]]

  :plugins [[lein-cljsbuild "1.1.7"]]

  :min-lein-version "2.5.3"

  :source-paths ["src/clj" "src/cljc" "src/cljs"]

  :test-paths ["test/clj"]

  :clean-targets ^{:protect false} ["resources/public/js/compiled" "target"
                                    "test/js"]

  :figwheel {:css-dirs ["resources/public/css"]
             :ring-handler scramblies.handler/dev-handler}

  :profiles
  {:dev
   {:dependencies [[binaryage/devtools "0.9.10"]
                   [re-frisk "0.5.4"]]

    :plugins      [[lein-figwheel "0.5.18"]
                   [lein-doo "0.1.8"]]}
   :prod {}
   :uberjar {:source-paths ["env/prod/clj"]
             :omit-source  true
             :main         scramblies.server
             :aot          [scramblies.server]
             :uberjar-name "scramblies.jar"
             :prep-tasks   ["compile" ["cljsbuild" "once" "min"]]}}

  :cljsbuild
  {:builds
   [{:id           "dev"
     :source-paths ["src/cljc" "src/cljs"]
     :figwheel     {:on-jsload "scramblies.core/mount-root"}
     :compiler     {:main                 scramblies.core
                    :output-to            "resources/public/js/compiled/app.js"
                    :output-dir           "resources/public/js/compiled/out"
                    :asset-path           "js/compiled/out"
                    :source-map-timestamp true
                    :preloads             [devtools.preload
                                           re-frisk.preload]
                    :external-config      {:devtools/config {:features-to-install :all}}}}

    {:id           "min"
     :source-paths ["src/cljc" "src/cljs"]
     :jar true
     :compiler     {:main            scramblies.core
                    :output-to       "resources/public/js/compiled/app.js"
                    :optimizations   :advanced
                    :closure-defines {goog.DEBUG false}
                    :pretty-print    false}}

    {:id           "test"
     :source-paths ["src/cljc" "src/cljs" "test/cljs"]
     :compiler     {:main          scramblies.runner
                    :output-to     "resources/public/js/compiled/test.js"
                    :output-dir    "resources/public/js/compiled/test/out"
                    :optimizations :none}}]})
