<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledMarkdownFile',
    'filename' => '/Users/jonatan/Downloads/grav-admin/user/pages/03.tiled/03.setting-up-your-tiled-map/04.creating-our-first-tile-map/default.md',
    'modified' => 1617910965,
    'data' => [
        'header' => [
            'title' => 'Creating Our First Tile Map',
            'menu' => 'Step 5 - Creating our First Tile Map'
        ],
        'frontmatter' => 'title: \'Creating Our First Tile Map\'
menu: \'Step 5 - Creating our First Tile Map\'',
        'markdown' => '<h1 class="text-center">Creating our First Tile Map</h1>

Everything is ready to create your map. Let\'s do this!! Go to the Layers Panel and select the `base` Layer, and on Tileset Panel select any tile that you want to use.

[![](https://i.ibb.co/k3xRKGt/Screen-Shot-2021-04-08-at-15-51-36.png?classes=center)](https://i.ibb.co/k3xRKGt/Screen-Shot-2021-04-08-at-15-51-36.png?target=_blank)

Now let\'s Paint the Tiles.

[![](https://i.ibb.co/PxFBBbH/Screen-Shot-2021-04-08-at-15-59-48.png?classes=center)](https://i.ibb.co/PxFBBbH/Screen-Shot-2021-04-08-at-15-59-48.png?target=_blank)

Save it and export it as a json file to the same folder that you save the .tmx file.

[![](https://i.ibb.co/ZN8wcmT/Screen-Shot-2021-04-08-at-16-02-19.png?classes=center)](https://i.ibb.co/ZN8wcmT/Screen-Shot-2021-04-08-at-16-02-19.png?target=_blank)

Now let\'s open up the Luminus RPG Template and create a new Scene under the `src/scenes` folder

```
export class TutorialScene extends Phaser.Scene {
    constructor() {
        super({
            key: \'TutorialScene\',
        });
    }

    create() {
    }
}
```

You have to Add it to the index.js file, that has the Phaser\'s configuration object. Under the `scene` attribute.

[![](https://i.ibb.co/4JSWhfc/Screen-Shot-2021-04-08-at-16-05-54.png?classes=center)](https://i.ibb.co/4JSWhfc/Screen-Shot-2021-04-08-at-16-05-54.png?target=_blank)

Next, let\'s import the assets on the `GameAssets.js` file.

```
import tutorial_tileset from \'../assets/maps/tilesets/tutorial_tileset_extruded.png\';
import tutorial_map_json from \'../assets/maps/tutorial/tutorial.json\';
```

There are some commets that might help you organize your imports, keep an eye on it when your importing these files. Then you should add the files to their specific configuration Arrays.

```
export const Images = [
  	..., // Commented for Code Brevity
    {
        name: \'tutorial_tileset\',
        image: tutorial_tileset,
    },
    ... // Commented for Code Brevity
    ];
    
    export const TilemapConfig = [
    {
        name: \'larus\',
        json: tile_map_json,
    },
    {
        name: \'tutorial\',
        json: tutorial_map_json,
    },
    ];
```

Markdown those names, you will need them now.

On your Scene file, you should create the LuminusMapCreator object like this.

```
import { TilesetImageConfig } from \'../models/TilesetImageConfig\';
import { LuminusMapCreator } from \'../plugins/LuminusMapCreator\';

export class TutorialScene extends Phaser.Scene {
    constructor() {
        super({
            key: \'TutorialScene\',
        });
    }

    create() {
        let map = new LuminusMapCreator(this);
        map.mapName = \'tutorial\';
        map.tilesetImages = [
            new TilesetImageConfig(
                \'tutorial_tileset_extruded\',
                \'tutorial_tileset\'
            ),
        ];
        map.create();
    }
}
```

Now you have to start your scene on the `PreloadScene.js`, look for something like this in the end of the file. Add the `this.scene.start(\'TutorialScene\');` under the `active()` method.

```
        WebFont.load({
            google: {
                families: [\'Press Start 2P\'],
            },
            active: () => {
                this.scene.start(\'TutorialScene\');
            },
        });
```

Run the `npm run start` in the root folder of the template, so you can see your map in action.

[![](https://i.ibb.co/SNpQyr1/Screen-Shot-2021-04-08-at-16-26-20.png?classes=center)](https://i.ibb.co/SNpQyr1/Screen-Shot-2021-04-08-at-16-26-20.png?target=_blank)

If you\'re seeing something like the picture above, set your camera to center on 0

```
import { TilesetImageConfig } from \'../models/TilesetImageConfig\';
import { LuminusMapCreator } from \'../plugins/LuminusMapCreator\';

export class TutorialScene extends Phaser.Scene {
    constructor() {
        super({
            key: \'TutorialScene\',
        });
    }

    create() {
        let map = new LuminusMapCreator(this);
        map.mapName = \'tutorial\';
        map.tilesetImages = [
            new TilesetImageConfig(
                \'tutorial_tileset_extruded\',
                \'tutorial_tileset\'
            ),
        ];
        map.create();
        this.cameras.main.centerOn(0, 0); // To Solve the issue with the camara position.
    }
}
```

'
    ]
];
