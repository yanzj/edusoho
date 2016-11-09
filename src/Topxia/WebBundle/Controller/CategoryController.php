<?php
namespace Topxia\WebBundle\Controller;

use Symfony\Component\HttpFoundation\Request;

class CategoryController extends BaseController
{
    public function allAction()
    {
        $categories = $this->getCategoryService()->findCategories(1);

        $data = array();
        foreach ($categories as $category) {
            $data[$category['id']] = array($category['name'], $category['parentId']);
        }

        return $this->createJsonResponse($data);
    }

    public function treeNavAction(Request $request, $categories)
    {
        
        return $this->render("TopxiaWebBundle:Category:explore-nav.html.twig", array(
            'categories' => $categories
        ));
    }

    protected function getCategoryService()
    {
        return $this->getServiceKernel()->createService('Taxonomy.CategoryService');
    }

    protected function getCourseService()
    {
        return $this->getServiceKernel()->createService('Course.CourseService');
    }
}
