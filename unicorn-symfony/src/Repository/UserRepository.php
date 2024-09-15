<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<User>
 */
class UserRepository extends ServiceEntityRepository
{
    private $em;
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $em)
    {
        parent::__construct($registry, User::class);
        $this->em = $em;
    }
    public function getUserNames(string $username){
        $qb =  $this->em->createQueryBuilder();
        $qb->select('u');
        $qb->from(User::class, 'u');
        $qb->where('u.username = :username');
        $qb->setParameter('username', $username);
        return $qb->getQuery()->getOneOrNullResult();

    }
    public function getAll(){
        $qb =  $this->em->createQueryBuilder();
        $qb->select('u');
        $qb->from(User::class, 'u');
        $qb->orderBy('u.id', 'DESC');
        return $qb->getQuery()->getArrayResult();

    }
    public function getOne($id){
        $qb =  $this->em->createQueryBuilder();
        $qb->select('u');
        $qb->from(User::class, 'u');
        $qb->where('u.id = :id');
        $qb->setParameter('id', $id);
        return $qb->getQuery()->getArrayResult();

    }
    //    /**
    //     * @return User[] Returns an array of User objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('u.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?User
    //    {
    //        return $this->createQueryBuilder('u')
    //            ->andWhere('u.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
