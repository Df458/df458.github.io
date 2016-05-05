var c;
var t;
var test_tex;
var ax;
var spr;

function draw_test()
{
    update_input();
    ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);

    t.rotate(0.1, true);

    var b = Math.abs((t.angle / 3) % (Math.PI) - Math.PI / 2);
    var d = Math.abs((t.angle / 4) % (Math.PI) - Math.PI / 2);
    var e = Math.abs((t.angle / 7) % (Math.PI) - Math.PI / 2);
    t.translate([ax.analog[0] * 4, ax.analog[1] * 4], true);
    if(t.scaling[0] > 1)
        t.scale([0.9, 0.9], true);
    // t.scale([(b * 3) + 1, (b * 3) + 1], false);
    // t.translate([Math.cos(t.angle / 5) * 450 + 500, Math.sin(t.angle / 3) * 200 + 350]);
    // render_quad(c, t.mat, [b, d, e, 1], test_tex, true);
    spr.update();
    spr.draw(c, t.mat, [b, d, e, 1], true);
}

function start()
{
    resource_path = "data"
    init_renderer();
    init_audio();
    init_input();

    c = new Matrix();
    c.ortho(0, 1024, 768, 0, 0, 1);

    t = new Transform2D();
    t.translate([400, 300]);

    test_tex = new Texture("textures", "test.png");
    // var a = new AudioPlayer("audio", "FINISH_HIM.ogg");
    var aplayer = new AudioPlayer("audio", "YES.ogg");

    var act = new ActionInput();
    act.onactive = function() { t.scale([10, 10], false); };
    act.bindKey(90);
    var act2 = new ActionInput();
    act2.onactive = function() { aplayer.play(); };
    act2.bindKey(88);

    ax = new AxisInput();
    ax.bindKey(39, true, true);
    ax.bindKey(37, true, false);
    ax.bindKey(40, false, true);
    ax.bindKey(38, false, false);

    spr = new Sprite("sprites", "test.spr");
    spr.set.onready = function() { spr.setAnimation("walk"); };

    main_loop_begin(draw_test);

    // load_resource_to_buffer(null, "test.txt", function() { alert(this.responseText); });
} 
