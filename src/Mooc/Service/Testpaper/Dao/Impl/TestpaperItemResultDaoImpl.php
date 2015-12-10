<?php

namespace Mooc\Service\Testpaper\Dao\Impl;

use Topxia\Service\Testpaper\Dao\Impl\TestpaperItemResultDaoImpl as BaseTestpaperItemResultDaoImpl;

class TestpaperItemResultDaoImpl extends BaseTestpaperItemResultDaoImpl
{
    public function searchTestpaperItemResultsCount($conditions)
    {
        $builder = $this->_createSearchQueryBuilder($conditions)
                        ->select('COUNT(id)');

        return $builder->execute()->fetchColumn(0);
    }

    protected function _createSearchQueryBuilder($conditions)
    {
        $builder = $this->createDynamicQueryBuilder($conditions)
                        ->from($this->table, 'testpaper_item_result')
                        ->andWhere('testId = :testId')
                        ->andWhere('status <> :excludeStatus')
                        ->andWhere('homeworkId = :homeworkId')
                        ->andWhere('status = :status')
                        ->andWhere('questionId = :questionId');

        return $builder;
    }
}
