<?php

namespace App\Services;

use App\Entity\User;
use App\Interfaces\UserInterface;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class UserService implements UserInterface {
    /**
     * @var ParameterBagInterface
     */
    private $bag;
    /**
     * @var UserRepository
     */
    private $userRepo;
    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(ParameterBagInterface $parameterBag,EntityManagerInterface $em, UserRepository $userRepo){
        $this->bag = $parameterBag;
        $this->userRepo = $userRepo;
        $this->em = $em;
    }
    public function register(array $params){
        $result['status'] = false;
        $user = new User();
        if(isset($params['username'])){
            $user->setUsername($params['username']);
            $user->setToken(md5($params['username']));

        }
        $this->em->persist($user);
        if (isset($params['avatar'])) {
            $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $params['avatar']));
            $avatarPath = $this->bag->get('base_dir') . '/public/avatars/' . $user->getId() . '/';
            if (!is_dir($avatarPath)) {
                mkdir($avatarPath, 0777, true);
            }
            $filePath = $avatarPath . uniqid() . $params['avatarName'];
            file_put_contents($filePath, $data);
            $user->setAvatar($filePath);
        }
        $this->em->persist($user);
        $this->em->flush();
        if ($user){
            $result['status'] = true;
            $result['data'] = [
                'id' => $user->getId(),
                'username' => $user->getUsername(),
                'token' => $user->getToken(),
                'avatar' => $user->getAvatar(),
            ];
        }
        return $result;
    }

    public function addCoins(array $params){
        $result['status'] = false;
        if(isset($params['id'])){
            $user = $this->userRepo->find(['id'=>$params['id']]);
            $user->setCoins($params['coins']);
            $user->setLevel($params['level']);
            $this->em->persist($user);
            $this->em->flush();
            $result['status'] = true;
            $result ['message'] = 'OK';
        }else{
            $result ['message'] = 'Id missing';
        }
        return $result;
    }

    public function getUsernames(array $params){
        $result ['status'] = false;
        if (isset($params['username']) && !empty($params['username'])) {
            $res = $this->userRepo->getUserNames($params['username']);
            if ($res) {
                $result ['status'] = true;
                $result ['res'] = false;
            } else {
                $result ['res'] = true;
                $result ['status'] = true;
            }
        }
        return $result;
    }
    public function getAll(){
        $result ['status'] = false;
        $result['data'] = $this->userRepo->getAll();
        foreach ($result['data'] as &$user) {
            if ($user['avatar']){
                $user['avatar'] = explode('/public', $user['avatar'])[1];
            }

        }

        if ($result['data']){
            $result ['status'] = true;
        }
        return $result;
    }
    public function getOne($id){
        $result ['status'] = false;
        $user = $this->userRepo->getOne($id)[0];
        if ($user['avatar']){
            $user['avatar'] = explode('/public', $user['avatar'])[1];
        }
            $result['data'] = $user;
        if ($result['data']){
            $result ['status'] = true;
        }

        return $result;
    }
}