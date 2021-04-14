import Phaser from 'phaser';
import { NineSlice } from 'phaser3-nineslice';
import { Item } from '../entities/Item';
import { Player } from '../entities/Player';
import { LuminusInterfaceController } from '../plugins/LuminusInterfaceController';

export class InventoryScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'InventoryScene',
        });

        /**
         * The player that will have it's inventoro opened.
         * @type { Player }
         */
        this.player = null;

        /**
         * The name of the sprite texture of the Inventory Title.
         * @type { string }
         */
        this.inventoryTitleTexture = 'inventory_title';

        /**
         * The name of the sprite texture of the Inventory Background.
         * @type { string }
         * @default
         */
        this.inventoryBackgroundTexture = 'inventory_background';

        /**
         * The name of the sprite texture of the Inventory Slot.
         * @type { string }
         * @default
         */
        this.inventorySlotTexture = 'inventory_slot';

        /**
         * The name of the sprite texture of the Close Button.
         * @type { string }
         * @default
         */
        this.inventoryCloseTexture = 'close_button';

        /**
         * The Offset of the Nine Slice background. It's used to protect the background from streching.
         * It will make it responsive in any scale size without losing resolution.
         * @type { number }
         * @default
         */
        this.nineSliceOffset = 10;

        /**
         * The inventory background sprite.
         * @type { NineSlice }
         */
        this.inventoryBackground = null;

        /**
         * The inventory title sprite.
         * @type { Phaser.GameObjects.Image }
         */
        this.inventoryTitle = null;

        /**
         * The inventory title sprite.
         * @type { Phaser.GameObjects.Image }
         */
        this.inventoryTitleText = null;

        /**
         * The inventory slots sprite.
         * @type { NineSlice[] }
         */
        this.inventorySlots = null;

        /**
         * The Close button image.
         * @type { Phaser.GameObjects.Image }
         */
        this.closeButton = null;

        /**
         * The slots and its content.
         * @type { Array }
         */
        this.slots = [];

        /**
         * The screen padding of the inventory when it's Mobile.
         * @type { number }
         * @default
         */
        this.screenPaddingMobile = 15;

        /**
         * The padding between the Background edge and the Slots.
         * @type { number }
         * @default
         */
        this.backgroundSlotPadding = 25;

        /**
         * The Padding of the Slots to the Top of the Inventory Background.
         * @type { number }
         * @default
         */
        this.backgroundSlotPaddingTop = 100;

        /**
         * The Padding of the Slots to the Bottom of the Inventory Background.
         * @type { number }
         * @default
         */
        this.backgroundSlotPaddingBottom = 20;

        /**
         * The margin between inventory slots.
         * @type { numbe }
         * @default
         */
        this.slotMargin = 10;

        /**
         * The size of the Slot. Width and Height.
         * @type { number }
         * @default
         */
        this.slotSize = 53;

        /**
         * Default font size of the Title Text.
         * @type { number }
         * @default
         */
        this.titleTextFontSize = 13;

        /**
         * The default font family of the Inventory Text.
         * @type { string }
         * @default
         */
        this.titleFontFamily = "'Press Start 2P'";

        /**
         * The class that will control the interface.
         * @type { LuminusInterfaceController }
         */
        this.luminusInterfaceController = null;
    }

    create() {
        this.luminusInterfaceController = new LuminusInterfaceController(this);
        this.createBackground();
        this.createTitle();
        this.createSlots();
        this.createCloseButton();
        this.createItems();

        this.scale.on('resize', (resize) => {
            this.resizeAll(resize);
        });
    }

    /**
     * Creates the Background Layer.
     */
    createBackground() {
        this.inventoryBackground = this.add
            .nineslice(
                this.cameras.main.midPoint.x - 512 / 2,
                this.cameras.main.midPoint.y - 512 / 2,
                512,
                512, // the width and height of your object
                this.inventoryBackgroundTexture, // a key to an already loaded image
                this.nineSliceOffset, // the width and height to offset for a corner slice
                this.nineSliceOffset // (optional) pixels to offset when computing the safe usage area
            )
            .setScrollFactor(0, 0)
            .setOrigin(0, 0);
    }

    /**
     * Creates the close Button.
     */
    createCloseButton() {
        this.closeButton = this.add
            .image(
                this.inventoryBackground.x +
                    this.inventoryBackground.width *
                        this.inventoryBackground.scaleX -
                    this.backgroundSlotPadding * 1.5,
                this.inventoryBackground.y + this.backgroundSlotPadding * 1.5,
                this.inventoryCloseTexture
            )
            .setInteractive()
            .setOrigin(0.5, 0.5)
            .setScale(0.8);

        this.closeButton.on('pointerup', (pointer) => {
            this.scene.stop();
        });

        this.luminusInterfaceController.interfaceElements[0] = [];
        this.luminusInterfaceController.interfaceElements[0][0] = [];
        let firstAction = {
            element: this.closeButton,
            action: `scene.stop`,
            context: this,
            args: null,
        };
        this.luminusInterfaceController.currentElementAction = firstAction;
        this.luminusInterfaceController.interfaceElements[0][0].push(
            firstAction
        );

        this.luminusInterfaceController.updateHighlightedElement(
            firstAction.element
        );
    }

    /**
     * Creates the inventory Title.
     */
    createTitle() {
        this.inventoryTitle = this.add
            .image(
                this.inventoryBackground.x +
                    (this.inventoryBackground.width *
                        this.inventoryBackground.scaleX) /
                        2,
                this.inventoryBackground.y + 54,
                this.inventoryTitleTexture
            )
            .setScrollFactor(0, 0)
            .setOrigin(0.5, 0.5);
        this.inventoryTitleText = this.add
            .text(
                this.inventoryTitle.x + 11,
                this.inventoryTitle.y + 7,
                'Inventory',
                {
                    fontSize: this.titleTextFontSize,
                    fontFamily: `${this.titleFontFamily}`,
                }
            )
            .setScrollFactor(0, 0)
            .setOrigin(0.5, 0.5);
    }

    /**
     * Destroys all the Slots and its dependencies.
     */
    destroySlots() {
        if (this.slots.length > 0) {
            this.slots.forEach((slot) => {
                if (slot.item) {
                    slot.item.destroy();
                    slot.text.destroy();
                }
                slot.destroy();
            });
        }
        this.slots = [];
    }

    /**
     * Creates the inventory Slots.
     */
    createSlots() {
        // Checks if there is any already created slots. If there is, it should destroy them bofore creating new ones.
        this.destroySlots();
        // The available space for the slots to be drawn.
        let slotsWorkingWidth = Math.abs(
            this.backgroundSlotPadding * 2 -
                this.inventoryBackground.width * this.inventoryBackground.scaleX
        );

        // Max number of Slots taking in count the Available space, Slot Size and Margin.
        let slotsNumberHorizontal = Math.floor(
            slotsWorkingWidth / (this.slotSize + this.slotMargin)
        );

        const padding = Math.ceil(
            (this.inventoryBackground.width * this.inventoryBackground.scaleX -
                slotsNumberHorizontal * (this.slotSize + this.slotMargin)) /
                2
        );

        let slotsWorkingHeight = Math.abs(
            this.inventoryBackground.height * this.inventoryBackground.scaleY -
                this.backgroundSlotPaddingTop -
                this.backgroundSlotPaddingBottom
        );

        // Max number of Slots taking in count the Available space, Slot Size and Margin.
        let slotsNumberVertical = Math.floor(
            slotsWorkingHeight / (this.slotSize + this.slotMargin)
        );

        // Creates the seccond line
        this.luminusInterfaceController.interfaceElements[1] = [];
        for (let row = 0; row < slotsNumberVertical; row++) {
            this.luminusInterfaceController.interfaceElements[1][row] = [];
            for (let col = 0; col < slotsNumberHorizontal; col++) {
                let slot = this.add
                    .image(
                        this.inventoryBackground.x +
                            (this.slotSize + this.slotMargin) * col +
                            padding +
                            this.slotMargin / 2,
                        this.inventoryBackground.y +
                            (this.slotSize + this.slotMargin) * row +
                            this.backgroundSlotPaddingTop,
                        this.inventorySlotTexture
                    )
                    .setScrollFactor(0, 0)
                    .setOrigin(0, 0);
                this.slots.push(slot);

                let element = {
                    element: slot,
                    action: 'useItem',
                    context: this,
                    args: slot,
                };
                this.luminusInterfaceController.interfaceElements[1][row].push(
                    element
                );
            }
        }
    }

    /**
     * When resizing, it should change the position of the slots acordingly.
     */
    setPositionSlotsItems() {
        // The available space for the slots to be drawn.
        let slotsWorkingWidth = Math.abs(
            this.backgroundSlotPadding * 2 -
                this.inventoryBackground.width * this.inventoryBackground.scaleX
        );

        // Max number of Slots taking in count the Available space, Slot Size and Margin.
        let slotsNumberHorizontal = Math.floor(
            slotsWorkingWidth / (this.slotSize + this.slotMargin)
        );

        const padding = Math.ceil(
            (this.inventoryBackground.width * this.inventoryBackground.scaleX -
                slotsNumberHorizontal * (this.slotSize + this.slotMargin)) /
                2
        );

        let slotsWorkingHeight = Math.abs(
            this.inventoryBackground.height * this.inventoryBackground.scaleY -
                this.backgroundSlotPaddingTop -
                this.backgroundSlotPaddingBottom
        );

        // Max number of Slots taking in count the Available space, Slot Size and Margin.
        let slotsNumberVertical = Math.floor(
            slotsWorkingHeight / (this.slotSize + this.slotMargin)
        );

        let count = 0;
        for (let row = 0; row < slotsNumberVertical; row++) {
            for (let col = 0; col < slotsNumberHorizontal; col++) {
                let slot = this.slots[count];
                this.slots[count].setPosition(
                    this.inventoryBackground.x +
                        (this.slotSize + this.slotMargin) * col +
                        padding +
                        this.slotMargin / 2,
                    this.inventoryBackground.y +
                        (this.slotSize + this.slotMargin) * row +
                        this.backgroundSlotPaddingTop
                );
                if (this.slots[count].item) {
                    let item = this.slots[count].item;
                    this.slots[count].item.setPosition(
                        slot.x + slot.width / 2,
                        slot.y + slot.height / 2 - 7
                    );
                    this.slots[count].text.setPosition(
                        item.x,
                        item.y + 10 + (item.height * item.scaleY) / 2
                    );
                }
                count++;
            }
        }
    }

    /**
     * Loops through the Player's items and Adds it to the inventory Slots
     */
    createItems() {
        let slotIndex = 0;
        let time = 0;
        for (let i = 0; i < this.player.items.length; i++) {
            let slot = this.slots[slotIndex];
            if (this.player.items[i] && this.player.items[i].id) {
                let text;
                let item = new Item(
                    this,
                    slot.x + slot.width / 2,
                    slot.y + slot.height / 2 - 7,
                    this.player.items[i].id
                );
                text = this.add
                    .text(
                        item.x,
                        item.y + 15 + (item.height * item.scaleY) / 2,
                        this.player.items[i].count
                    )
                    .setOrigin(0.5, 0.5);
                // Sets the slot item;
                slot.item = item;
                // Sets the Text.
                slot.text = text;
                slot.playerItemIndex = i;
                if (item.stackable) {
                    slot.setInteractive();
                    slot.on('pointerup', (pointer) => {
                        if (time === 0) {
                            time = pointer.upTime;
                            return;
                        }
                        let elapsed = Math.abs(time - pointer.upTime);
                        if (elapsed < 350) {
                            this.useItem(slot);
                            time = 0;
                        } else {
                            time = 0;
                        }
                    });
                    item.setScale(item.inventoryScale);
                } else {
                    for (
                        let noStackCount = 0;
                        noStackCount < this.player.items[i].count;
                        noStackCount++
                    ) {
                        // TODO - Create the logic for Equipments.
                    }
                }
            }
        }
    }

    useItem(slot) {
        if (slot && slot.item) {
            let item = slot.item;
            let text = slot.text;
            let i = slot.playerItemIndex;
            item.consume(this.player);
            this.player.items[i].count--;
            if (this.player.items[i].count <= 0) {
                item.destroy();
                delete this.player.items[i];
                text.setText('');
                text.destroy();
                // TODO - Rearange the items.
            } else {
                text.setText(this.player.items[i].count);
            }
        }
    }

    /**
     *
     * @param { any } args The initial arguments.
     */
    init(args) {
        this.player = args.player;
        this.player.canMove = false;
    }

    update() {}

    /**
     * Resizes everything
     * @param { Size } size the new size.
     */
    resizeAll(size) {
        if (this.cameras && this.cameras.main) {
            this.inventoryBackground.setPosition(
                this.cameras.main.midPoint.x - 512 / 2,
                this.cameras.main.midPoint.y - 512 / 2
            );

            this.inventoryTitle.setPosition(
                this.inventoryBackground.x + this.inventoryBackground.width / 2,
                this.inventoryBackground.y + 54
            );

            this.inventoryTitleText.setPosition(
                this.inventoryTitle.x + 11,
                this.inventoryTitle.y + 7
            );

            this.closeButton.setPosition(
                this.inventoryBackground.x +
                    this.inventoryBackground.width *
                        this.inventoryBackground.scaleX -
                    this.backgroundSlotPadding * 1.5,
                this.inventoryBackground.y + this.backgroundSlotPadding * 1.5
            );

            this.setPositionSlotsItems();
        }
    }
}
