var enemy_list = [];
var enemy_act_avail_list = [];

class Enemy
{
    constructor(position, orientation)
    {
        this.transform = new Transform2D();
        this.sprite = new Sprite(s_ship);
        this.speed = 4;
        this.init(position, orientation)
    }

    init(position, orientation)
    {
        this.alive = true;
        this.sprite.setAnimation("enemy1");
        this.transform.translate(position.slice());
        this.transform.rotate(orientation);
        this.rotvel = ((Math.random() * 2) - 1) * (Math.PI / 180)
        this.health = 5;
        this.exploding = false;
    }

    update()
    {
        if(!this.exploding) {
            this.transform.translate([Math.cos(this.transform.angle) * this.speed, Math.sin(this.transform.angle) * this.speed], true);
            this.transform.rotate(this.rotvel, true);
            this.rotvel += (Math.random() * 0.3 - 0.15) * (Math.PI / 180);
            if(Math.random() * 100 <= 1)
                create_bullet(this.transform.position, this.transform.angle, false);
            if(Math.abs(this.rotvel) >= 0.075)
                this.rotvel = 0;
        }
        if(this.health <= 0) {
            if(this.exploding == false) {
                this.exploding = true
                enemies_left--;
                this.sprite.setAnimation("explode");
                this.sprite.play();
            } else {
                if(this.sprite.playing == false)
                    this.destroy();
            }
        }
        this.sprite.update();
        this.sprite.draw(main_camera, this.transform.mat, [1, 1, 1, 1], true);
        if(this.transform.position[0] < -100 || this.transform.position[0] > 1124 || this.transform.position[1] < -100 || this.transform.position[1] > 868) {
            this.destroy();
        }
    }

    destroy()
    {
        if(!this.alive)
            return;
        enemy_act_avail_list.push(this);
        this.alive = false;
    }
}

function update_enemies()
{
    for(var i = 0; i < enemy_list.length; ++i) {
        if(enemy_list[i].alive)
            enemy_list[i].update();
    }
}

function create_enemy(pos, rot)
{
    if(enemy_act_avail_list.length > 0) {
        enemy_act_avail_list[enemy_act_avail_list.length - 1].init(pos, rot);
        enemy_act_avail_list.pop();
    }
    enemy_list.push(new Enemy(pos, rot));
}
