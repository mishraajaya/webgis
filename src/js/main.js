require('../styles/main.css')
require('../styles/top.css')
require('../styles/ol.css')
require('../styles/background-map.css')
require('../styles/print-map.css')
require('../styles/layer-tree.css')
require('../styles/measurement.css')
require('../index.html')

import { library, dom } from "@fortawesome/fontawesome-svg-core"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


library.add(fas, far, fab)
dom.watch()