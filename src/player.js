var player_sprite;
var life_sprite;
var bomb_sprite;
var enemy_sprite;
var goal_sprite;

var player_transform;

var move_axis;
var fire_axis;
var fire_timer = 0;
var bomb_count = 3;
var life_count = 6;
var enemies_left = 32;
var enemy_goal = 32;

var player_speed = 4;

function prepare_player()
{
    player_sprite = new Sprite(s_ship);
    life_sprite   = new Sprite(s_icon);
    bomb_sprite   = new Sprite(s_icon);
    enemy_sprite   = new Sprite(s_icon);
    goal_sprite   = new Sprite(s_icon);
    bomb_sprite   = new Sprite(s_icon);
    player_sprite.setAnimation("default");
    bomb_sprite.setAnimation("bombs");

    player_transform = new Transform2D();
    player_transform.translate([512, 384]);

    fire_axis = new AxisInput();
    fire_axis.bindKey(39, true, true);
    fire_axis.bindKey(37, true, false);
    fire_axis.bindKey(40, false, true);
    fire_axis.bindKey(38, false, false);

    move_axis = new AxisInput();
    move_axis.bindKey(68, true, true);
    move_axis.bindKey(65, true, false);
    move_axis.bindKey(83, false, true);
    move_axis.bindKey(87, false, false);
    var bact = new ActionInput();
    bact.bindKey(69);
    bact.onactive = bomb;
}

function update_player()
{
    if(life_count > 0) {
        if(fire_timer > 0)
            fire_timer -= 0.015;
        player_transform.translate([move_axis.analog[0] * player_speed, move_axis.analog[1] * player_speed], true);
        if(fire_axis.analog[0] != 0 || fire_axis.analog[1] != 0) {
            player_transform.rotate(Math.atan2(fire_axis.analog[0], -fire_axis.analog[1]));
            if(fire_timer <= 0) {
                create_bullet(player_transform.position, player_transform.angle - ((90 + Math.random() * 6 - 3) * (Math.PI / 180)), true);
                fire_timer = 0.1;
            }
        }
    }

    player_sprite.update();
    if(player_sprite.playing || life_count > 0)
        player_sprite.draw(main_camera, player_transform.mat, [1, 1, 1, 1], true);
    bomb_sprite.update();
    var bmat = new Matrix();
    bmat.translate(1008, 752);
    for(var i = 0; i < bomb_count; ++i)
    {
        bomb_sprite.draw(main_camera, bmat, [1, 1, 1, 1], true);
        bmat.translate(-32, 0, true);
    }
    var lmat = new Matrix();
    life_sprite.setAnimation("lives");
    lmat.translate(16, 752);
    for(var i = 0; i < life_count; i += 2)
    {
        life_sprite.draw(main_camera, lmat, [1, 1, 1, 1], true);
        lmat.translate(32, 0, true);
    }

    enemy_sprite.setAnimation("enemies");
    goal_sprite.setAnimation("kills");
    var emat = new Matrix();
    emat.translate(16, 16, false);
    var i;
    for(i = 0; i < enemies_left; ++i)
    {
        enemy_sprite.draw(main_camera, emat, [1, 1, 1, 1], true);
        emat.translate(32, 0, true);
    }
    for(; i < enemy_goal; ++i)
    {
        goal_sprite.draw(main_camera, emat, [1, 1, 1, 1], true);
        emat.translate(32, 0, true);
    }

}

function bomb()
{
    if(bomb_count <= 0 || life_count <= 0)
        return;
    --bomb_count;
    var offset = Math.random() * 6;
    for(var i = 0; i < 360; i += 5) {
        create_bullet(player_transform.position, (i + offset) * (Math.PI / 180), true, true);
    }
    clear_bullets(false);
}
