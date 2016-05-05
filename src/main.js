function tick()
{
    update_input();
    ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);
    update_bullets();
    if(Math.random() * 100 <= 1) {
        create_enemy([Math.random() * 1000, Math.random() * 750], Math.random() * Math.PI * 2);
    }
    update_enemies();
    update_player();
}

function start()
{
    init_renderer();
    init_audio();
    init_input();

    init_camera();

    // assets_complete = function() { final_prepare(); };
    load_assets();
    final_prepare();
} 

function final_prepare()
{
    prepare_player();

    main_loop_begin(tick);
}
