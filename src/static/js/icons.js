// Alleen de icoontjes die we gebruiken, uit de gratis Font Awesome-set.
// Ze vervangen automatisch de <i class="fa-..."> elementen in de HTML.
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faComments, faNewspaper } from '@fortawesome/free-regular-svg-icons';
import {
    faInfo, faXmark, faCaretDown, faHeartPulse, faMicroscope,
    faMusic, faPersonRunning, faSimCard, faSackDollar,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faComments, faNewspaper, faInfo, faXmark, faCaretDown, faHeartPulse,
    faMicroscope, faMusic, faPersonRunning, faSimCard, faSackDollar,
);

dom.watch();
