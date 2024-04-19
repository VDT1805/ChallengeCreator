<?php

return [
    /**
     * Control if the seeder should create a user per role while seeding the data.
     */
    'create_users' => false,

    /**
     * Control if all the laratrust tables should be truncated before running the seeder.
     */
    'truncate_tables' => true,

    'roles_structure' => [
        'owner' => [
            'questionbank' => 'c,r,u,d',
            'test' => 'c,r,u,d',
            'label' => 'c,r,u,d',
            'question' => 'c,r,u,d',
            'member' => 'c,r,u,d'
        ],
        'editor' => [
            'questionbank' => 'r',
            'question' => 'c,r,u,d',
            'test' => 'c,r,u,d',
            'label' => 'c,r,u,d',
            'member' => 'r'
        ],
        'viewer' => [
            'questionbank' => 'r',
            'question' => 'r',
            'test' => 'r',
            'label' => 'r',
            'member' => 'r'
        ],
    ],

    'permissions_map' => [
        'c' => 'create',
        'r' => 'read',
        'u' => 'update',
        'd' => 'delete',
    ],
];
