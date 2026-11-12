/* V0.69.0.0 additional artwork registrations */
(function(){for(const id of NEW_HERO_IDS_V0690){if(typeof ART_V2==='undefined')continue;for(const type of ['full_body','upper_body','face_icons'])if(ART_V2[type])ART_V2[type][id]=`assets/ART_V2/${type}/${id}.webp?v=0.69.1.0`;}})();
