<?php
namespace App\Interfaces;

interface UploadFileInterface{
    public function uploadAvatar($file, int $id);
}