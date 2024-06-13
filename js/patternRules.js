const TILE_TYPES = {
    GRASS: 'grass',
    SIDEWALK: 'sidewalk',
    ROAD: 'road',
    NEIGHBORHOOD: 'neighborhood',
    NOTHING: 'nothing',
};

const PATTERN_RULES = [
    {
        pattern: [
            [undefined, undefined, undefined],
            [undefined, TILE_TYPES.GRASS, undefined],
            [undefined, undefined, undefined],
        ],
        image: 'assets/tiles/grass.png'
    },
    {
        pattern: [
            [undefined, undefined, undefined],
            [undefined, TILE_TYPES.NOTHING, undefined],
            [undefined, undefined, undefined],
        ],
        image: 'assets/tiles/grass.png'
    },
    {
        pattern: [
            [undefined, undefined, undefined],
            [TILE_TYPES.SIDEWALK, TILE_TYPES.SIDEWALK, TILE_TYPES.SIDEWALK],
            [undefined, undefined, undefined],
        ],
        image: 'assets/tiles/sidewalk-horizontal.png'
    },
    {
        pattern: [
            [undefined, TILE_TYPES.SIDEWALK, undefined],
            [undefined, TILE_TYPES.SIDEWALK, undefined],
            [undefined, TILE_TYPES.SIDEWALK, undefined],
        ],
        image: 'assets/tiles/sidewalk-vertical.png'
    },
    {
        pattern: [
            [undefined, TILE_TYPES.SIDEWALK, undefined],
            [undefined, TILE_TYPES.SIDEWALK, TILE_TYPES.SIDEWALK],
            [undefined, undefined, undefined],
        ],
        image: 'assets/tiles/sidewalk-corner-0.png'
    },
    {
        pattern: [
            [undefined, TILE_TYPES.SIDEWALK, undefined],
            [TILE_TYPES.SIDEWALK, TILE_TYPES.SIDEWALK, undefined],
            [undefined, undefined, undefined],
        ],
        image: 'assets/tiles/sidewalk-corner-270.png'
    },
    {
        pattern: [
            [undefined, undefined, undefined],
            [TILE_TYPES.SIDEWALK, TILE_TYPES.SIDEWALK, undefined],
            [undefined, TILE_TYPES.SIDEWALK, undefined],
        ],
        image: 'assets/tiles/sidewalk-corner-180.png'
    },
    {
        pattern: [
            [undefined, undefined, undefined],
            [undefined, TILE_TYPES.SIDEWALK, TILE_TYPES.SIDEWALK],
            [undefined, TILE_TYPES.SIDEWALK, undefined],
        ],
        image: 'assets/tiles/sidewalk-corner-90.png'
    },
    {
        pattern: [
            [undefined, TILE_TYPES.ROAD, undefined],
            [undefined, TILE_TYPES.ROAD, TILE_TYPES.SIDEWALK],
            [undefined, TILE_TYPES.ROAD, undefined],
        ],
        image: 'assets/tiles/road-vertical-b.png'
    },
    {
        pattern: [
            [undefined, TILE_TYPES.ROAD, undefined],
            [TILE_TYPES.SIDEWALK, TILE_TYPES.ROAD, undefined],
            [undefined, TILE_TYPES.ROAD, undefined],
        ],
        image: 'assets/tiles/road-vertical-a.png'
    },
    {
        pattern: [
            [undefined, TILE_TYPES.ROAD, undefined],
            [undefined, TILE_TYPES.ROAD, TILE_TYPES.GRASS],
            [undefined, TILE_TYPES.ROAD, undefined],
        ],
        image: 'assets/tiles/road-vertical-b.png'
    },
    {
        pattern: [
            [undefined, TILE_TYPES.ROAD, undefined],
            [TILE_TYPES.GRASS, TILE_TYPES.ROAD, undefined],
            [undefined, TILE_TYPES.ROAD, undefined],
        ],
        image: 'assets/tiles/road-vertical-a.png'
    },

    {
        pattern: [
            [undefined, undefined, undefined],
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
            [undefined, TILE_TYPES.SIDEWALK, undefined],
        ],
        image: 'assets/tiles/road-horizontal-a.png'
    },
    {
        pattern: [
            [undefined, TILE_TYPES.SIDEWALK, undefined],
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
            [undefined, undefined, undefined],
        ],
        image: 'assets/tiles/road-horizontal-b.png'
    },
    {
        pattern: [
            [undefined, undefined, undefined],
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
            [undefined, TILE_TYPES.GRASS, undefined],
        ],
        image: 'assets/tiles/road-horizontal-a.png'
    },
    {
        pattern: [
            [undefined, TILE_TYPES.GRASS, undefined],
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
            [undefined, undefined, undefined],
        ],
        image: 'assets/tiles/road-horizontal-b.png'
    },
    {
        pattern: [
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.SIDEWALK],
        ],
        image: 'assets/tiles/road-cross-0.png'
    },
    {
        pattern: [
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.SIDEWALK],
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
        ],
        image: 'assets/tiles/road-cross-270.png'
    },
    {
        pattern: [
            [TILE_TYPES.SIDEWALK, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
        ],
        image: 'assets/tiles/road-cross-180.png'
    },
    {
        pattern: [
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
            [TILE_TYPES.ROAD, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
            [TILE_TYPES.SIDEWALK, TILE_TYPES.ROAD, TILE_TYPES.ROAD],
        ],
        image: 'assets/tiles/road-cross-90.png'
    },
];

export { TILE_TYPES, PATTERN_RULES };