<template>
  <div class="container mt-4">
    <transition appear @enter="enter" @after-enter="afterEnter">
      <h1 class="mb-4">Globomantics Doc Tracker</h1>
    </transition>
    <transition name="b" appear>
      <div class="mb-4">
        <div class="input-group">
          <input type="text" v-model="newDocument.description" 
            class="form-control" placeholder="Document description">
          <input type="date" v-model="newDocument.expirationDate"
            class="form-control">
          <button @click="addDocument" class="btn btn-primary">
              Add Document
          </button>
        </div>
      </div>
    </transition>
    <transition name="swap" mode="out-in">
      <div v-if="filteredDocuments.length">
        <transition-group class="list-group" tag="ul" name="docs" appear>
          <li v-for="document in filteredDocuments" 
            :key="document.id" class="list-group-item">
              {{ document.description }} - 
              Expires in 
              {{ getDaysRemaining(document.expirationDate) }} days
              <button @click="removeDocument(document.id)" 
                class="btn btn-danger float-end">
                Remove
              </button>
          </li>
        </transition-group>
      </div>
      <div v-else>Great, there are no documents to keep an eye on!</div>
    </transition>

    <transition name="notification">
      <Notification v-if="showNotification" />
    </transition>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Notification from './components/Notification.vue';

export default {
  components: { Notification },
  setup() {
    const showNotification = ref(false);
    const documents = ref([
    {
        id: 1,
        description: 'Passport 1',
        expirationDate: '22-Nov-2029'
      },
      {
        id: 2,
        description: 'Passport 2',
        expirationDate: '29-Dec-2031'
      },
      {
        id: 3,
        description: 'Passport 3',
        expirationDate: '21-Jun-2027'
      }
    ]);

    const newDocument = ref({
      description: '',
      expirationDate: ''
    });

    const displayNotification = () => {
      showNotification.value = true;
      setTimeout(() => showNotification.value = false, 3000);
    };

    const addDocument = () => {
      if (newDocument.value.description && newDocument.value.expirationDate) {
        const document = {
          id: Date.now(),
          description: newDocument.value.description,
          expirationDate: newDocument.value.expirationDate
        };
        documents.value.push(document);
        newDocument.value.description = '';
        newDocument.value.expirationDate = '';
      }
      else {
        displayNotification();
      }
    };

    const removeDocument = (id) => {
      documents.value = documents.value.filter(document => document.id !== id);
    };

    const getDaysRemaining = (expirationDate) => {
      const currentDate = new Date();
      const expiryDate = new Date(expirationDate);
      const timeDiff = expiryDate.getTime() - currentDate.getTime();
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysRemaining;
    };

    const filteredDocuments = computed(() => {
      const currentDate = new Date();
      return documents.value.filter(document => {
        const expiryDate = new Date(document.expirationDate);
        return expiryDate >= currentDate;
      });
    });

    const enter = (el) => {
      el.style.color = 'gray';
      el.style.transform = 'translateY(-20px)';
    };

    const afterEnter = (el) => {
      setTimeout(() => { 
        el.style.color = 'black';
        el.style.transform = 'translateY(0)'; 
      }, 500);
    };

    return {
      documents,
      newDocument,
      addDocument,
      removeDocument,
      getDaysRemaining,
      filteredDocuments,
      showNotification,
      displayNotification,
      enter,
      afterEnter
    };
  }
};
</script>

<style>
@keyframes shake {
  0% { transform: translateY(-40px); opacity: 0; }
  45% { transform: translateY(0); opacity: 1; }
  55% { transform: translateX(15px); }
  65% { transform: translateX(0); }
  80% { transform: translateX(15px) ;}
  100% { transform: translateX(0); }
}
.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.swap-enter-to,
.swap-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.swap-enter-active,
.swap-leave-active {
  transition: all 0.5s ease;
}
.docs-enter-from,
.docs-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.docs-enter-to,
.docs-leave-from {
  opacity: 1;
  transform: scale(1);
}
.docs-enter-active {
  transition: all 0.5s ease;
}
.docs-leave-active {
  transition: all 0.5s ease;
  position: absolute;
}
.docs-move {
  transition: all 0.5s ease;
}
/*.notification-enter-from,*/
.notification-leave-to {
  opacity: 0;
  transform: translateY(-80px);
}
/*.notification-enter-to,*/
.notification-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.notification-enter-active {
  animation: shake 0.8s ease;
}
.notification-leave-active {
  transition: all 0.5s ease;
}
.b-enter-to,
.b-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.b-enter-from,
.b-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}
.b-enter-active,
.b-leave-active {
  transition: all 1.0s ease-in; 
}
.list-group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>