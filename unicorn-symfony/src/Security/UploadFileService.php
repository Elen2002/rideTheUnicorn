<?php

namespace App\Security;

use App\Interfaces\UploadFileInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\String\Slugger\SluggerInterface;


class UploadFileService implements UploadFileInterface {
    private Filesystem $filesystem;
    private SluggerInterface $slugger;
    private ParameterBagInterface $bag;
    public function __construct(

                                Filesystem $filesystem,
                                SluggerInterface $slugger,
                                ParameterBagInterface $bag){

        $this->filesystem = $filesystem;
        $this->slugger = $slugger;
        $this->bag = $bag;
    }
    public function uploadAvatar($file, int $id){
        $imageDirectory = $this->bag->get('base_dir').'/public/avatars/'.$id;
        if(!$this->filesystem->exists($imageDirectory)){
            $this->filesystem->mkdir($imageDirectory);
        }
        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $this->slugger->slug($originalFilename).'.'.$file->guessExtension();
        try {
            $file->move($imageDirectory, $safeFilename);
        } catch (FileException $e) {
            // ... handle exception if something happens during file upload
        }
        // $uploadedName = $this->uploadFile($file, $imageDirectory);
        return $safeFilename;
    }

}