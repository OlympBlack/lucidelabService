<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Service;
use App\Models\Realisation;
use App\Models\Blog;
use App\Models\Partner;
use App\Models\ContactMessage;
use App\Models\Announcement;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Initial Admin User
        User::updateOrCreate(
            ['email' => 'admin@lucidelab.com'],
            [
                'name' => 'Super Admin LUCIDE LAB',
                'password' => Hash::make('password'),
            ]
        );

        // 2. Global Site Settings
        $settings = [
            'site_name' => 'LUCIDE LAB',
            'tagline' => 'Cabinet d\'expertise en communication et croissance de marque',
            'phone' => '0166285017',
            'email' => 'lucidelabofficiel@gmail.com',
            'address' => 'Cotonou, Bénin',
            'opening_hours' => 'Lundi — Vendredi : 08h00 - 18h30',
            'mission' => 'Nous aidons les entreprises ambitieuses à construire une image de marque cohérente, crédible et performante.',
            'vision' => 'Devenir le cabinet de référence en communication et stratégie de marque au Bénin, puis rayonner à l\'échelle de l\'Afrique de l\'Ouest francophone.',
            'values_lucidite' => 'Chaque décision repose sur une analyse claire et rigoureuse.',
            'values_excellence' => 'Le détail fait la différence dans chaque création.',
            'values_creativite' => 'Créer des expériences qui marquent les esprits.',
            'values_performance' => 'Chaque projet produit un impact mesurable.',
            'logo_url' => '/assets/logo-lucidelab.png',
            'favicon_url' => '/favicon.ico',
            'facebook' => 'https://facebook.com/lucidelabofficiel',
            'linkedin' => 'https://linkedin.com/company/lucidelabofficiel',
            'instagram' => 'https://instagram.com/lucidelabofficiel',
            'twitter' => 'https://twitter.com/lucidelabofficiel',
            'meta_title' => 'LUCIDE LAB | Cabinet d\'Expertise en Communication & Branding au Bénin',
            'meta_description' => 'LUCIDE LAB accompagne les entreprises qui veulent une image de marque crédible, moderne et performante.',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        // 3. Pôles de Services (6 Pôles d'expertise)
        $services = [
            [
                'code' => 'STRATEGY',
                'title' => 'STRATEGY — Définir la bonne direction',
                'subtitle' => 'Audit, Positionnement & Plan 360°',
                'description' => 'Analyse approfondie du marché, positionnement stratégique et plan de communication sur-mesure pour atteindre vos objectifs d\'affaires.',
                'details' => [
                    'Audit & Diagnostic de marque',
                    'Étude de marché & Analyse concurrentielle',
                    'Plateforme de marque & Positionnement',
                    'Plan d\'action & Stratégie de communication 360°'
                ],
                'is_active' => true,
            ],
            [
                'code' => 'BRAND',
                'title' => 'BRAND — Construire une identité forte',
                'subtitle' => 'Branding & Identité Visuelle',
                'description' => 'Création de marque, charte graphique, branding émotionnel et design système pour marquer durablement les esprits.',
                'details' => [
                    'Naming & Identité verbale',
                    'Conception de logo & Univers visuel',
                    'Charte graphique & Brand Guidelines',
                    'Design packaging & Supports de communication'
                ],
                'is_active' => true,
            ],
            [
                'code' => 'DIGITAL',
                'title' => 'DIGITAL — Créer des expériences numériques',
                'subtitle' => 'Websites & Applications sur-mesure',
                'description' => 'Sites web modernes, applications interactives et plateformes digitales conçues pour la conversion et l\'engagement.',
                'details' => [
                    'Création de sites vitrines & corporate',
                    'Développement d\'applications Web & Mobile',
                    'UI/UX Design & Prototypage',
                    'Optimisation de la conversion (CRO)'
                ],
                'is_active' => true,
            ],
            [
                'code' => 'GROWTH',
                'title' => 'GROWTH — Développer la visibilité',
                'subtitle' => 'Acquisition Client & SEO/SEA',
                'description' => 'Stratégies d\'acquisition, SEO, marketing de performance et optimisation continue pour accélérer votre croissance.',
                'details' => [
                    'Référencement naturel (SEO) & Référencement payant (SEA)',
                    'Stratégies d\'acquisition de leads B2B/B2C',
                    'Marketing automation & Lead Nurturing',
                    'Analyse des métriques de croissance'
                ],
                'is_active' => true,
            ],
            [
                'code' => 'CONTENT',
                'title' => 'CONTENT — Créer du contenu qui marque',
                'subtitle' => 'Production Vidéo & Copywriting',
                'description' => 'Storytelling puissant, création de contenus vidéo/audio, rédaction stratégique et gestion de communauté.',
                'details' => [
                    'Production vidéo & Brand Content',
                    'Shooting photo professionnel',
                    'Gestion des réseaux sociaux (Community Management)',
                    'Rédaction stratégique & Copywriting'
                ],
                'is_active' => true,
            ],
            [
                'code' => 'ADVERTISING',
                'title' => 'ADVERTISING — Faire connaître les marques',
                'subtitle' => 'Campagnes Média & Publicité',
                'description' => 'Campagnes publicitaires ciblées, achat média digital & traditionnel, et maximisation du retour sur investissement.',
                'details' => [
                    'Gestion de campagnes Meta Ads, Google Ads & LinkedIn Ads',
                    'Achat d\'espace média traditionnel (Affichage, Radio, Presse)',
                    'Optimisation du ROI publicitaire',
                    'Reporting & Tableaux de bord de performance'
                ],
                'is_active' => true,
            ]
        ];

        foreach ($services as $srv) {
            Service::updateOrCreate(['code' => $srv['code']], $srv);
        }

        // 4. Réalisations (Portfolio)
        $realisations = [
            [
                'title' => 'Repositionnement Marque Bancaire',
                'category' => 'BRAND',
                'client_name' => 'Groupe Financier Régional',
                'description' => 'Refonte complète de l\'identité visuelle et déploiement de la nouvelle charte graphique sur l\'ensemble des supports.',
                'image_url' => '/assets/images/hero1.jpg',
                'year' => '2025',
                'is_featured' => true
            ],
            [
                'title' => 'Plateforme E-Commerce Agro-business',
                'category' => 'DIGITAL',
                'client_name' => 'AgroTech Bénin',
                'description' => 'Conception web responsive et système de commande en ligne sécurisé pour des produits agricoles locaux.',
                'image_url' => '/assets/images/hero2.png',
                'year' => '2025',
                'is_featured' => true
            ],
            [
                'title' => 'Campagne de Lancement Growth Meta & Google',
                'category' => 'GROWTH',
                'client_name' => 'Startup Logistique',
                'description' => 'Stratégie d\'acquisition d\'utilisateurs ayant permis d\'augmenter les demandes de livraison de +180% en 3 mois.',
                'image_url' => '/assets/images/hero3.jpg',
                'year' => '2026',
                'is_featured' => true
            ],
            [
                'title' => 'Série Vidéo & Storytelling d\'Entreprise',
                'category' => 'CONTENT',
                'client_name' => 'Groupe Immobilier Pan-Africain',
                'description' => 'Production audiovisuelle haute définition mettant en valeur les projets architecturaux phares de la marque.',
                'image_url' => '/assets/images/hero1.jpg',
                'year' => '2025',
                'is_featured' => false
            ],
            [
                'title' => 'Campagne Publicitaire Affichage & Digital',
                'category' => 'ADVERTISING',
                'client_name' => 'Compagnie d\'Assurance Vie',
                'description' => 'Achat média multi-canal déployé au Bénin, Togo et Côte d\'Ivoire.',
                'image_url' => '/assets/images/hero2.png',
                'year' => '2026',
                'is_featured' => false
            ],
            [
                'title' => 'Conseil en Positionnement Stratégique',
                'category' => 'STRATEGY',
                'client_name' => 'Institution de Microfinance',
                'description' => 'Définition d\'une stratégie 360° pour conquérir une nouvelle cible de jeunes entrepreneurs.',
                'image_url' => '/assets/images/hero3.jpg',
                'year' => '2025',
                'is_featured' => false
            ]
        ];

        foreach ($realisations as $r) {
            Realisation::updateOrCreate(['title' => $r['title']], $r);
        }


        // 5. Blogs
        $blogs = [
            [
                'title' => 'Comment construire une identité de marque forte et mémorable en 2026 ?',
                'slug' => 'comment-construire-une-identite-de-marque-forte-en-2026',
                'category' => 'BRANDING',
                'excerpt' => 'Le branding ne se limite pas à un beau logo. Découvrez les 5 étapes clés pour créer une marque crédible qui capte l\'attention de votre cible.',
                'content' => 'Sur un marché de plus en plus saturé, l\'image de marque (branding) constitue le premier levier de différenciation stratégique pour toute entreprise ambitieuse. Une marque forte ne se résume pas uniquement à un logo élégant ou une typographie tendance : elle incarne une promesse de valeur, une personnalité et une identité cohérente perçue à chaque point de contact.\n\n1. La Lucidité : Connaître sa valeur et sa cible.\n2. L\'Excellence du Design & du Storytelling.\n3. Mesurer et Faire Évoluer.',
                'author' => 'Équipe LUCIDE LAB',
                'views_count' => 450,
                'is_published' => true,
            ],
            [
                'title' => 'Les clés d\'une stratégie de Growth Hacking réussie en Afrique de l\'Ouest',
                'slug' => 'les-cles-d-une-strategie-growth-reussie-en-afrique-de-l-ouest',
                'category' => 'GROWTH',
                'excerpt' => 'Comprendre les spécificités des consommateurs régionaux pour maximiser le taux de conversion de vos campagnes digitales.',
                'content' => 'L\'Afrique de l\'Ouest francophone connaît une accélération sans précédent de l\'adoption du numérique. Pour réussir une campagne d\'acquisition, les entreprises doivent adapter leurs leviers aux usages locaux, notamment le mobile-first et le social selling.',
                'author' => 'Expert Digital LUCIDE LAB',
                'views_count' => 310,
                'is_published' => true,
            ],
            [
                'title' => 'Pourquoi la lucidité est la clé de voûte de tout positionnement d\'entreprise',
                'slug' => 'pourquoi-la-lucidite-est-la-cle-du-positionnement-strategique',
                'category' => 'STRATEGY',
                'excerpt' => 'Une analyse sans concession de vos forces et du marché est la seule manière d\'éviter les erreurs coûteuses de communication.',
                'content' => 'Chez LUCIDE LAB, la lucidité est le premier des quatre piliers fondamentaux. Sans un diagnostic sans complaisance des réalités de votre marché, toute campagne de communication risque de passer à côté de son objectif.',
                'author' => 'Directeur Stratégie',
                'views_count' => 280,
                'is_published' => true,
            ]
        ];

        foreach ($blogs as $b) {
            Blog::updateOrCreate(['slug' => $b['slug']], $b);
        }

        // 6. Partners / Témoignages
        $partners = [
            [
                'name' => 'Marc Lawson',
                'role' => 'Directeur Général, FinTech Bénin',
                'testimonial' => 'LUCIDE LAB a totalement métamorphosé notre image de marque. Leur approche rigoureuse et lucide nous a permis de gagner la confiance d\'investisseurs majeurs.',
                'rating' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Sophie Tossou',
                'role' => 'Fondatrice, AgroTech Solutions',
                'testimonial' => 'L\'équipe a su capter l\'essence de notre projet et créer une plateforme web performante couplée à une campagne growth qui a doublé nos ventes.',
                'rating' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Koffi Mensah',
                'role' => 'Directeur Marketing, Groupe Immobilier',
                'testimonial' => 'Excellence et créativité au rendez-vous. Les vidéos et visuels produits par LUCIDE LAB sont d\'une qualité digne des plus grands cabinets internationaux.',
                'rating' => 5,
                'is_active' => true,
            ]
        ];

        foreach ($partners as $p) {
            Partner::updateOrCreate(['name' => $p['name']], $p);
        }

        // 7. Contact Messages
        $messages = [
            [
                'name' => 'Jean-Marc Dagba',
                'email' => 'jmd@entreprise-benin.bj',
                'phone' => '0166285017',
                'service' => 'STRATEGY',
                'subject' => 'Demande d\'audit stratégique pour refonte de marque',
                'message' => 'Bonjour l\'équipe LUCIDE LAB, nous souhaitons planifier un diagnostic de notre identité visuelle et bénéficier de vos conseils pour un repositionnement régional.',
                'status' => 'NEW'
            ],
            [
                'name' => 'Bernadette Kpadonou',
                'email' => 'b.k@agrotech.bj',
                'phone' => '0199001122',
                'service' => 'BRAND',
                'subject' => 'Création de charte graphique et Naming',
                'message' => 'Nous créons une nouvelle filiale dans l\'agro-alimentaire et recherchons un cabinet d\'expertise pour concevoir notre marque.',
                'status' => 'PROCESSED'
            ],
            [
                'name' => 'Christian Akpo',
                'email' => 'c.akpo@logistique.com',
                'phone' => '0122334455',
                'service' => 'GROWTH',
                'subject' => 'Campagne d\'acquisition de leads B2B',
                'message' => 'Besoin d\'une stratégie Google Ads et LinkedIn Ads ciblée sur l\'Afrique de l\'Ouest.',
                'status' => 'IN_PROGRESS'
            ]
        ];

        foreach ($messages as $m) {
            ContactMessage::updateOrCreate(
                ['email' => $m['email'], 'subject' => $m['subject']],
                $m
            );
        }

        // 8. Announcements
        Announcement::updateOrCreate(
            ['title' => 'Nouveau Pôle Growth Marketing ouvert !'],
            [
                'content' => 'LUCIDE LAB lance son pôle spécialisé en acquisition et marketing de performance.',
                'link_url' => '/services',
                'is_active' => true
            ]
        );
    }
}
