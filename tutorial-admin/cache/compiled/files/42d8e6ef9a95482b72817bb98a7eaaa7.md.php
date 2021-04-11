<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledMarkdownFile',
    'filename' => '/Users/jonatan/Documents/Projects/games/collision/tutorial-admin/user/pages/03.tiled/03.setting-up-your-tiled-map/08.how-to-effectively-draw-a-tile-map/default.md',
    'modified' => 1618167881,
    'data' => [
        'header' => [
            'title' => 'How to Effectively Draw a Tile Map',
            'menu' => 'Step 8 - How to Effectively Draw a Tile Map'
        ],
        'frontmatter' => 'title: \'How to Effectively Draw a Tile Map\'
menu: \'Step 8 - How to Effectively Draw a Tile Map\'',
        'markdown' => '<h1 class="text-center">Step 8 - How to Effectively Draw a Tile Map</h1>

Now that we have a basic map we can start creating a more complex MAP using the multiple Layers that we have created. Lets clear everything that we have on our current Map and start over. Let\'s add another Tileset that the Template already uses `src/assets/maps/tilesets/Overworld-extruded.png`, it\'s an already extruded tileset, follow the same steps that we used on the [Step 4 - Creating My First Tileset](../creating-my-first-tileset)

[![](https://i.ibb.co/xYHy2YR/Screen-Shot-2021-04-09-at-15-53-51.png?classes=center)](https://i.ibb.co/xYHy2YR/Screen-Shot-2021-04-09-at-15-53-51.png?target=_blank)

Before we start drawing anything I will teach you how to create Terrains. Actually, I will leave this job to Mike "My Buddy" (Actually I don\'t know him) to Teach you. [How to Create Terrains on Tiled.](https://www.youtube.com/watch?v=SIYNuXdDClU&ab_channel=Gamefromscratch?target=_blank)

Having created your terrain, select it, and start to Draw your tiles on the `base` layer. I have created what I think is Sand (I don\'t know actually, but I call it Sand). 

[![](https://i.ibb.co/x86gxzL/Screen-Shot-2021-04-11-at-12-50-00.png?classes=center)](https://i.ibb.co/x86gxzL/Screen-Shot-2021-04-11-at-12-50-00.png?target=_blank)

Now we are going to add a House, but beware that you can\'t use the `base` layer to draw it, otherwise the terrain tiles that you have used will be replaced by the house. That\'s Why we have created other layers to draw upon. Select the `overlay` layer and place the house on it.

This house right here.
[![](https://i.ibb.co/Mp47tL5/Screen-Shot-2021-04-11-at-12-48-50.png?classes=center)](https://i.ibb.co/Mp47tL5/Screen-Shot-2021-04-11-at-12-48-50.png?target=_blank)


Using the `base` layer.
[![](https://i.ibb.co/KWYYtnJ/Screen-Shot-2021-04-11-at-12-54-54.png?classes=center)](https://i.ibb.co/KWYYtnJ/Screen-Shot-2021-04-11-at-12-54-54.png?target=_blank)

Using the `overlay`
[![](https://i.ibb.co/xCCQ6Zq/Screen-Shot-2021-04-11-at-15-16-07.png?classes=center)](https://i.ibb.co/xCCQ6Zq/Screen-Shot-2021-04-11-at-15-16-07.png?target=_blank)

Did you see the difference? Whenever you need something to be drawn above a tile without losing what is underneath, create a new layer and draw on it. Now that you know it, let\'s draw some stuff and set collisions on them. Don\'t forget that the collisions should be drawn on the `collisions` layer.

[![](https://i.ibb.co/8XdHqVJ/Screen-Shot-2021-04-11-at-15-20-45.png?classes=center)](https://i.ibb.co/8XdHqVJ/Screen-Shot-2021-04-11-at-15-20-45.png?target=_blank)

Let\'s [Place the player](../adding-the-player) somewhere on this map.

[![](https://i.ibb.co/xDr9VFp/Screen-Shot-2021-04-11-at-15-28-22.png?classes=center)](https://i.ibb.co/xDr9VFp/Screen-Shot-2021-04-11-at-15-28-22.png?target=_blank)

Don\'t forget to add the `TilesetImageConfig` in order to use the `overworld` tileset that you have create. You can check the JSDoc to learn more about this Class.

```
	create() {
        let map = new LuminusMapCreator(this);
        map.mapName = \'tutorial\';
        map.tilesetImages = [
            new TilesetImageConfig(
                \'tutorial_tileset_extruded\',
                \'tutorial_tileset\'
            ),
            new TilesetImageConfig(\'collision\', \'collision_tile\'), // Add these lines to use the Collision tiles.
            new TilesetImageConfig(\'overworld\', \'tiles_overworld\'), // Add these lines to use the Overworld Tileset.
        ];
        map.create();
        this.cameras.main.startFollow(this.player.container);
        this.cameras.main.setZoom(2.5);
    }
```

Now you can walk arround. Try to walk behind the House.

[![](https://i.ibb.co/RCbHX7n/Screen-Shot-2021-04-11-at-15-37-55.png?classes=center)](https://i.ibb.co/RCbHX7n/Screen-Shot-2021-04-11-at-15-37-55.png?target=_blank)

This a spected behavior as the player was drawn after the Tile Layers.

<h3 id="depth">The `depth` property</h3>

In order to make the player to be hidden behind the house you have to use another layer. But not only that, we need to create a new property to that Layer called `depth` and set it to a high number to make sure it will be drawn always above the player. I will use 99, and I will use the `overplayer` layer. Don\'t forget to erase what ou have drawn on the `overlay` layer using the eraser, using the (E) key. OH! The `overlay` layer has to be selected so it erases whats is on the `overlay` layer.

[![](https://i.ibb.co/grsCVYr/Screen-Shot-2021-04-11-at-15-44-12.png?classes=center)](https://i.ibb.co/grsCVYr/Screen-Shot-2021-04-11-at-15-44-12.png?target=_blank)

[![](https://i.ibb.co/GkMkBzB/Screen-Shot-2021-04-11-at-15-41-19.png?classes=center)](https://i.ibb.co/GkMkBzB/Screen-Shot-2021-04-11-at-15-41-19.png?target=_blank)

[![](https://i.ibb.co/7jJvjVK/Screen-Shot-2021-04-11-at-15-48-10.png?classes=center)](https://i.ibb.co/7jJvjVK/Screen-Shot-2021-04-11-at-15-48-10.png?target=_blank)

Save, export and try to walk behind the house again.

[![](https://i.ibb.co/f9KDcdB/Screen-Shot-2021-04-11-at-15-50-12.png?classes=center)](https://i.ibb.co/f9KDcdB/Screen-Shot-2021-04-11-at-15-50-12.png?target=_blank)

It hides the player now, if you need to draw something above the `overplayer` layer you will have to set a property `depth` with value 100 or more on this new layer, so it gets drawn above the `overplayer` layer. That\'s it. Feel free to create a whole world now, use your imagination.
'
    ]
];
