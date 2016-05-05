var player_bullet_list = [];
var player_avail_list = [];
var enemy_bullet_list = [];
var enemy_avail_list = [];

class Bullet
{
    constructor(position, orientation, speed, animation, player)
    {
        this.player = player;
        this.transform = new Transform2D();
        this.sprite = new Sprite(s_bullet);
        this.init(position, orientation, speed, animation)
    }

    init(position, orientation, speed, animation)
    {
        this.alive = true;
        this.speed = speed;
        this.transform.translate(position.slice());
        this.transform.rotate(orientation);
        this.sprite.setAnimation(animation);
    }

    update()
    {
        this.transform.translate([Math.cos(this.transform.angle) * this.speed, Math.sin(this.transform.angle) * this.speed], true)
        // this.transform.translate([this.transform.mat[0] * this.speed, this.transform.mat[1] * this.speed]);
        this.sprite.update();
        // console.log(this.transform.position);
        this.sprite.draw(main_camera, this.transform.mat, [1, 1, 1, 1], true);
        if(this.transform.position[0] < -100 || this.transform.position[0] > 1124 || this.transform.position[1] < -100 || this.transform.position[1] > 868)
            this.destroy();
    }

    destroy()
    {
        if(!this.alive)
            return;
        if(this.player)
            player_avail_list.push(this);
        else
            enemy_avail_list.push(this);
        this.alive = false;
    }
}

function update_bullets()
{
    for(var i = 0; i < player_bullet_list.length; ++i) {
        if(player_bullet_list[i].alive) {
            player_bullet_list[i].update();
            for(var j = 0; j < enemy_list.length; ++j) {
                if(enemy_list[j].alive && circle_check(player_bullet_list[i].transform.position, 8, enemy_list[j].transform.position, 16)) {
                    player_bullet_list[i].destroy();
                    enemy_list[j].health--;
                }
            }
        }
    }
    for(var i = 0; i < enemy_bullet_list.length; ++i) {
        if(enemy_bullet_list[i].alive) {
            enemy_bullet_list[i].update();
            if(life_count > 0 && circle_check(enemy_bullet_list[i].transform.position, 8, player_transform.position, 20)) {
                enemy_bullet_list[i].destroy();
                life_count--;
                if(life_count == 0)
                    player_sprite.setAnimation("explode");
            }
        }
    }
}

function create_bullet(pos, rot, player)
{
    if(player) {
        var spr = "enemy_shot_1"
        if(arguments.length > 3)
            spr = "enemy_shot_3";
        if(player_avail_list.length > 0) {
            player_avail_list[player_avail_list.length - 1].init(pos, rot, 6, spr);
            player_avail_list.pop();
        }
        player_bullet_list.push(new Bullet(pos, rot, 6, spr, player));
    } else {
        if(enemy_avail_list.length > 0) {
            enemy_avail_list[enemy_avail_list.length - 1].init(pos, rot, 6, "enemy_shot_2");
            enemy_avail_list.pop();
        }
        enemy_bullet_list.push(new Bullet(pos, rot, 6, "enemy_shot_2", player));
    }
}

function clear_bullets(player)
{
    if(player) {
        for(var i = 0; i < player_bullet_list.length; ++i) {
            if(player_bullet_list[i].alive) {
                player_bullet_list[i].destroy();
            }
        }
    } else {
        for(var i = 0; i < enemy_bullet_list.length; ++i) {
            if(enemy_bullet_list[i].alive) {
                enemy_bullet_list[i].destroy();
            }
        }
    }
}
