var assets_complete = function() { };

var s_ship;   // Ship animations
var s_icon;   // Icons
var s_bullet; // Bullets

var assets_count = 3;
var loaded_count = 0;

function load_assets()
{
    resource_path = "data";
    s_ship = new Spriteset("sprites", "player.spr");
    s_ship.onready = asset_loaded;
    s_icon = new Spriteset("sprites", "icons.spr");
    s_icon.onready = asset_loaded;
    s_bullet = new Spriteset("sprites", "shot.spr");
    s_bullet.onready = asset_loaded;
}

function asset_loaded()
{
    loaded_count++;
    if(loaded_count >= assets_count)
        assets_complete();
}
