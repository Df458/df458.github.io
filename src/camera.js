var main_camera;

function init_camera()
{
    main_camera = new Matrix();
    main_camera.ortho(0, 1024, 768, 0, 0, 1);
}
